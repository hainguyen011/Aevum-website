async function checkPageSpeed(strategy = 'mobile') {
  const targetUrl = 'https://www.aevum.ai.vn/';
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${strategy}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;
  
  console.log(`\n🔍 Fetching Google PageSpeed Insights for [${strategy.toUpperCase()}]... (Takes ~15-20s)`);
  
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    
    if (data.error) {
      console.error('PageSpeed API Error:', data.error.message);
      return;
    }
    
    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;
    
    console.log(`\n=============================================`);
    console.log(`🏆 LIGHTHOUSE SCORES [${strategy.toUpperCase()}] - https://www.aevum.ai.vn/`);
    console.log(`=============================================`);
    console.log(`  ⚡ Performance:    ${Math.round((categories?.performance?.score || 0) * 100)} / 100`);
    console.log(`  🔍 SEO:            ${Math.round((categories?.seo?.score || 0) * 100)} / 100`);
    console.log(`  ♿ Accessibility:  ${Math.round((categories?.accessibility?.score || 0) * 100)} / 100`);
    console.log(`  🛡️ Best Practices: ${Math.round((categories?.['best-practices']?.score || 0) * 100)} / 100`);
    
    console.log(`\n--- 📊 Core Web Vitals ---`);
    console.log(`  • FCP (First Contentful Paint): ${audits?.['first-contentful-paint']?.displayValue}`);
    console.log(`  • LCP (Largest Contentful Paint): ${audits?.['largest-contentful-paint']?.displayValue}`);
    console.log(`  • TBT (Total Blocking Time):     ${audits?.['total-blocking-time']?.displayValue}`);
    console.log(`  • CLS (Cumulative Layout Shift): ${audits?.['cumulative-layout-shift']?.displayValue}`);
    console.log(`  • Speed Index:                  ${audits?.['speed-index']?.displayValue}`);
    
    console.log(`\n--- 💡 Top Optimization Opportunities ---`);
    const oppKeys = [
      'render-blocking-resources',
      'unused-javascript',
      'modern-image-formats',
      'offscreen-images',
      'unminified-javascript',
      'uses-responsive-images',
      'efficient-animated-content'
    ];
    
    for (const key of oppKeys) {
      const opp = audits?.[key];
      if (opp && opp.score !== 1 && opp.displayValue) {
        console.log(`  ⚠️  ${opp.title}: ${opp.displayValue}`);
      }
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

async function main() {
  await checkPageSpeed('desktop');
  await checkPageSpeed('mobile');
}

main();
