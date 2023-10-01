  /**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export default {
    // 1. Run your custom tests along with all the default Lighthouse tests.
    extends: 'lighthouse:default',
  
    // 2. Register new artifact with custom gatherer.
    settings: {
        onlyAudits: [
            {id: 'Accessibility', gatherer: './core/gather/gatherers/accessibility.js'},
        ],
    },
    artifacts: [
        {id: 'Accessibility', gatherer: 'accessibility'},
    ],
  
    // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
    //audits: [
    //  'memory-audit',
    //],
  
    // 4. Create a new 'My site audits' section in the default report for our results.
    categories: {
      mysite: {
        title: 'WebA11y audits',
        description: 'open source website and app accessibility reviews',
        //auditRefs: [
          // When we add more custom audits, `weight` controls how they're averaged together.
          //{id: 'memory-audit', weight: 1},
        //],
      },
    },
  };