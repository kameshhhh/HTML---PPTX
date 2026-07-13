export interface HtmlTemplate {
  name: string;
  description: string;
  html: string;
}

export const EXAMPLE_TEMPLATES: HtmlTemplate[] = [
  {
    name: 'Title Slide',
    description: 'A clean title slide with subtitle',
    html: `<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); min-height: 100%; padding: 60px 80px; font-family: 'Segoe UI', Arial, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
  <h1 style="color: #e94560; font-size: 48px; font-weight: 700; margin: 0 0 20px 0; letter-spacing: -1px;">Project Kickoff 2024</h1>
  <p style="color: #a8b2d8; font-size: 22px; margin: 0 0 40px 0;">Building the Future, One Sprint at a Time</p>
  <div style="width: 80px; height: 4px; background: #e94560; border-radius: 2px; margin-bottom: 40px;"></div>
  <p style="color: #6b7db3; font-size: 16px; margin: 0;">Presented by the Engineering Team • June 2024</p>
</div>`,
  },
  {
    name: 'Content Slide',
    description: 'Slide with heading and bullet points',
    html: `<div style="background: #ffffff; padding: 48px 64px; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100%;">
  <h2 style="color: #1a1a2e; font-size: 32px; font-weight: 700; margin: 0 0 8px 0;">Key Objectives</h2>
  <div style="width: 60px; height: 4px; background: #4361ee; border-radius: 2px; margin-bottom: 32px;"></div>
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px;">
    <li style="display: flex; align-items: flex-start; gap: 16px; background: #f8f9ff; border-radius: 8px; padding: 16px 20px;">
      <span style="background: #4361ee; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0;">1</span>
      <div><strong style="color: #1a1a2e; font-size: 16px;">Launch MVP by Q3</strong><p style="color: #6b7280; font-size: 14px; margin: 4px 0 0 0;">Deliver core features to first 100 beta users</p></div>
    </li>
    <li style="display: flex; align-items: flex-start; gap: 16px; background: #f8f9ff; border-radius: 8px; padding: 16px 20px;">
      <span style="background: #4361ee; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0;">2</span>
      <div><strong style="color: #1a1a2e; font-size: 16px;">Achieve 95% uptime SLA</strong><p style="color: #6b7280; font-size: 14px; margin: 4px 0 0 0;">Robust monitoring and incident response</p></div>
    </li>
    <li style="display: flex; align-items: flex-start; gap: 16px; background: #f8f9ff; border-radius: 8px; padding: 16px 20px;">
      <span style="background: #4361ee; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0;">3</span>
      <div><strong style="color: #1a1a2e; font-size: 16px;">Scale to 10k users</strong><p style="color: #6b7280; font-size: 14px; margin: 4px 0 0 0;">Infrastructure ready for rapid growth</p></div>
    </li>
  </ul>
</div>`,
  },
  {
    name: 'Stats Slide',
    description: 'Metrics and KPI display',
    html: `<div style="background: #0f172a; padding: 48px 64px; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100%;">
  <h2 style="color: #f1f5f9; font-size: 28px; font-weight: 600; margin: 0 0 40px 0; text-align: center;">Performance Metrics</h2>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
    <div style="background: #1e293b; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #334155;">
      <p style="color: #38bdf8; font-size: 52px; font-weight: 800; margin: 0 0 8px 0;">98.7%</p>
      <p style="color: #94a3b8; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Uptime</p>
    </div>
    <div style="background: #1e293b; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #334155;">
      <p style="color: #34d399; font-size: 52px; font-weight: 800; margin: 0 0 8px 0;">2.4M</p>
      <p style="color: #94a3b8; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">API Calls / Day</p>
    </div>
    <div style="background: #1e293b; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #334155;">
      <p style="color: #f472b6; font-size: 52px; font-weight: 800; margin: 0 0 8px 0;">142ms</p>
      <p style="color: #94a3b8; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Avg. Latency</p>
    </div>
  </div>
</div>`,
  },
  {
    name: 'Table Slide',
    description: 'Data table layout',
    html: `<div style="background: #ffffff; padding: 40px 56px; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100%;">
  <h2 style="color: #1a1a2e; font-size: 28px; font-weight: 700; margin: 0 0 28px 0;">Q2 Team Performance</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <thead>
      <tr style="background: #1a1a2e; color: white;">
        <th style="padding: 12px 16px; text-align: left; border-radius: 8px 0 0 0;">Team Member</th>
        <th style="padding: 12px 16px; text-align: center;">Tickets Closed</th>
        <th style="padding: 12px 16px; text-align: center;">Code Reviews</th>
        <th style="padding: 12px 16px; text-align: center; border-radius: 0 8px 0 0;">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #f8f9ff;">
        <td style="padding: 12px 16px; color: #1a1a2e; font-weight: 600;">Alice Johnson</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">47</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">23</td>
        <td style="padding: 12px 16px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 20px; font-weight: 600;">98</span></td>
      </tr>
      <tr style="background: #ffffff;">
        <td style="padding: 12px 16px; color: #1a1a2e; font-weight: 600;">Bob Chen</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">38</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">31</td>
        <td style="padding: 12px 16px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 20px; font-weight: 600;">94</span></td>
      </tr>
      <tr style="background: #f8f9ff;">
        <td style="padding: 12px 16px; color: #1a1a2e; font-weight: 600;">Carol Smith</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">52</td>
        <td style="padding: 12px 16px; text-align: center; color: #374151;">18</td>
        <td style="padding: 12px 16px; text-align: center;"><span style="background: #fef9c3; color: #a16207; padding: 4px 12px; border-radius: 20px; font-weight: 600;">87</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
  {
    name: 'Two Column',
    description: 'Split content layout',
    html: `<div style="background: #f8f9ff; padding: 48px 64px; font-family: 'Segoe UI', Arial, sans-serif; min-height: 100%; display: flex; flex-direction: column;">
  <h2 style="color: #1a1a2e; font-size: 30px; font-weight: 700; margin: 0 0 32px 0;">Before vs. After</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; flex: 1;">
    <div style="background: #fff0f0; border-radius: 12px; padding: 28px; border-left: 4px solid #ef4444;">
      <h3 style="color: #ef4444; font-size: 18px; margin: 0 0 16px 0;">❌ Before</h3>
      <ul style="color: #374151; font-size: 14px; line-height: 1.8; padding-left: 18px; margin: 0;">
        <li>Manual deployment process</li>
        <li>4-hour release cycles</li>
        <li>No automated testing</li>
        <li>Siloed team communication</li>
        <li>70% test coverage</li>
      </ul>
    </div>
    <div style="background: #f0fdf4; border-radius: 12px; padding: 28px; border-left: 4px solid #22c55e;">
      <h3 style="color: #16a34a; font-size: 18px; margin: 0 0 16px 0;">✅ After</h3>
      <ul style="color: #374151; font-size: 14px; line-height: 1.8; padding-left: 18px; margin: 0;">
        <li>Fully automated CI/CD pipeline</li>
        <li>15-minute release cycles</li>
        <li>800+ automated tests</li>
        <li>Unified Slack channels</li>
        <li>97% test coverage</li>
      </ul>
    </div>
  </div>
</div>`,
  },
  {
    name: 'Thank You',
    description: 'Closing slide',
    html: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100%; padding: 60px 80px; font-family: 'Segoe UI', Arial, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
  <div style="font-size: 64px; margin-bottom: 24px;">🙏</div>
  <h1 style="color: #ffffff; font-size: 52px; font-weight: 800; margin: 0 0 16px 0;">Thank You</h1>
  <p style="color: rgba(255,255,255,0.8); font-size: 20px; margin: 0 0 48px 0;">Questions & Discussion</p>
  <div style="display: flex; gap: 32px; color: rgba(255,255,255,0.7); font-size: 14px;">
    <span>📧 team@company.com</span>
    <span>🌐 company.com/docs</span>
    <span>💬 #engineering-general</span>
  </div>
</div>`,
  },
];
