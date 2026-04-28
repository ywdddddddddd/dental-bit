/**
 * 口腔健康解密卡 - 支付验证 Worker
 * 部署到 Cloudflare Workers (免费额度 10万次/天)
 * 
 * 部署步骤:
 * 1. npx wrangler deploy
 * 2. 在 Cloudflare Dashboard 创建 KV Namespace: dental_pay
 * 3. 绑定 KV: wrangler.toml 中配置
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    // 生成支付会话 token（用户点击支付时调用）
    if (url.pathname === '/create-session') {
      const token = 'PAY-' + crypto.randomUUID().slice(0, 8).toUpperCase();
      // 存入 KV，30分钟过期
      await env.PAY_KV.put(token, 'pending', { expirationTtl: 1800 });
      return Response.json({ token, success: true }, { headers: cors });
    }

    // 用户轮询支付状态
    if (url.pathname === '/check-status') {
      const token = url.searchParams.get('token');
      if (!token) return Response.json({ status: 'invalid' }, { headers: cors });
      const status = await env.PAY_KV.get(token);
      return Response.json({ status: status || 'invalid' }, { headers: cors });
    }

    // 管理端：确认收款后标记 token 为 verified
    if (url.pathname === '/verify-payment' && request.method === 'POST') {
      const { token, adminKey } = await request.json();
      if (adminKey !== (env.ADMIN_KEY || 'dental2026')) {
        return Response.json({ error: '密钥错误' }, { status: 401, headers: cors });
      }
      const current = await env.PAY_KV.get(token);
      if (current === 'pending') {
        await env.PAY_KV.put(token, 'verified');
        return Response.json({ success: true }, { headers: cors });
      }
      return Response.json({ error: 'token已使用或不存在' }, { headers: cors });
    }

    // 管理端：批量生成固定兑换码
    if (url.pathname === '/generate-code' && request.method === 'POST') {
      const { adminKey, count } = await request.json();
      if (adminKey !== (env.ADMIN_KEY || 'dental2026')) {
        return Response.json({ error: '密钥错误' }, { status: 401, headers: cors });
      }
      const codes = [];
      for (let i = 0; i < (count || 5); i++) {
        const arr = new Uint8Array(8);
        crypto.getRandomValues(arr);
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = 'DPM-';
        for (let j = 0; j < 8; j++) code += chars[arr[j] % chars.length];
        await env.PAY_KV.put(code, 'valid', { expirationTtl: 86400 * 90 });
        codes.push(code);
      }
      return Response.json({ codes, success: true }, { headers: cors });
    }

    // 验证固定兑换码
    if (url.pathname === '/redeem-code') {
      const code = url.searchParams.get('code');
      if (!code) return Response.json({ status: 'invalid' }, { headers: cors });
      const status = await env.PAY_KV.get(code.toUpperCase().trim());
      if (status === 'valid') {
        await env.PAY_KV.put(code.toUpperCase().trim(), 'used');
        return Response.json({ status: 'valid' }, { headers: cors });
      }
      return Response.json({ status: status === 'used' ? 'used' : 'invalid' }, { headers: cors });
    }

    // 验证交易号后6位（全局防重用）
    if (url.pathname === '/verify-txn') {
      const txn = url.searchParams.get('txn');
      if (!txn || !/^\d{6}$/.test(txn)) {
        return Response.json({ ok: false, error: '格式错误' }, { headers: cors });
      }
      const existing = await env.PAY_KV.get('txn:' + txn);
      if (existing) {
        return Response.json({ ok: false, error: '已使用' }, { headers: cors });
      }
      await env.PAY_KV.put('txn:' + txn, 'used', { expirationTtl: 86400 * 30 });
      return Response.json({ ok: true }, { headers: cors });
    }

    return new Response('Not found', { status: 404, headers: cors });
  },
};
