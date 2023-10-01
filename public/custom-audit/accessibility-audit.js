/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

 import {Audit} from 'lighthouse';
 import AccessibilityGatherer from './accessibility-gatherer';
 // Import the Audit module from the lighthouse-core folder
 import Audit from 'lighthouse/core/audits/audit';

 // Get the accessibility information from the custom gatherer
 const accessibilityInfo = artifacts.AccessibilityGatherer;
 
 /**
  * @fileoverview Tests that the website meets WCAG accessibility standards and guidelines.
  */
 
 // Define the accessibility standards and guidelines to check
 const accessibilityStandards = [
    // You can add your own standards here, or use the built-in ones from Lighthouse
    {id: 'accesskeys', weight: 7, group: 'a11y-navigation'},
    {id: 'aria-allowed-attr', weight: 10, group: 'a11y-aria'},
    {id: 'aria-allowed-role', weight: 1, group: 'a11y-aria'},
    {id: 'aria-command-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-dialog-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-hidden-body', weight: 10, group: 'a11y-aria'},
    {id: 'aria-hidden-focus', weight: 7, group: 'a11y-aria'},
    {id: 'aria-input-field-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-meter-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-progressbar-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-required-attr', weight: 10, group: 'a11y-aria'},
    {id: 'aria-required-children', weight: 10, group: 'a11y-aria'},
    {id: 'aria-required-parent', weight: 10, group: 'a11y-aria'},
    {id: 'aria-roles', weight: 7, group: 'a11y-aria'},
    {id: 'aria-text', weight: 7, group: 'a11y-aria'},
    {id: 'aria-toggle-field-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-tooltip-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-treeitem-name', weight: 7, group: 'a11y-aria'},
    {id: 'aria-valid-attr-value', weight: 10, group: 'a11y-aria'},
    {id: 'aria-valid-attr', weight: 10, group: 'a11y-aria'},
    {id: 'button-name', weight: 10, group: 'a11y-names-labels'},
    {id: 'bypass', weight: 7, group: 'a11y-navigation'},
    {id: 'color-contrast', weight: 7, group: 'a11y-color-contrast'},
    {id: 'definition-list', weight: 7, group: 'a11y-tables-lists'},
    {id: 'dlitem', weight: 7, group: 'a11y-tables-lists'},
    {id: 'document-title', weight: 7, group: 'a11y-names-labels'},
    {id: 'duplicate-id-active', weight: 7, group: 'a11y-navigation'},
    {id: 'duplicate-id-aria', weight: 10, group: 'a11y-aria'},
    {id: 'form-field-multiple-labels', weight: 3, group: 'a11y-names-labels'},
    {id: 'frame-title', weight: 7, group: 'a11y-names-labels'},
    {id: 'heading-order', weight: 3, group: 'a11y-navigation'},
    {id: 'html-has-lang', weight: 7, group: 'a11y-language'},
    {id: 'html-lang-valid', weight: 7, group: 'a11y-language'},
    {id: 'html-xml-lang-mismatch', weight: 3, group: 'a11y-language'},
    {id: 'image-alt', weight: 10, group: 'a11y-names-labels'},
    {id: 'image-redundant-alt', weight: 1, group: 'a11y-names-labels'},
    {id: 'input-button-name', weight: 10, group: 'a11y-names-labels'},
    {id: 'input-image-alt', weight: 10, group: 'a11y-names-labels'},
    {id: 'label-content-name-mismatch', weight: 7, group: 'a11y-names-labels'},
    {id: 'label', weight: 7, group: 'a11y-names-labels'},
    {id: 'link-in-text-block', weight: 7, group: 'a11y-color-contrast'},
    {id: 'link-name', weight: 7, group: 'a11y-names-labels'},
    {id: 'list', weight: 7, group: 'a11y-tables-lists'},
    {id: 'listitem', weight: 7, group: 'a11y-tables-lists'},
    {id: 'meta-refresh', weight: 10, group: 'a11y-best-practices'},
    {id: 'meta-viewport', weight: 10, group: 'a11y-best-practices'},
    {id: 'object-alt', weight: 7, group: 'a11y-names-labels'},
    {id: 'select-name', weight: 7, group: 'a11y-names-labels'},
    {id: 'skip-link', weight: 3, group: 'a11y-names-labels'},
    {id: 'tabindex', weight: 7, group: 'a11y-navigation'},
    {id: 'table-duplicate-name', weight: 1, group: 'a11y-tables-lists'},
    {id: 'table-fake-caption', weight: 7, group: 'a11y-tables-lists'},
    {id: 'td-has-header', weight: 10, group: 'a11y-tables-lists'},
    {id: 'td-headers-attr', weight: 7, group: 'a11y-tables-lists'},
    {id: 'th-has-data-cells', weight: 7, group: 'a11y-tables-lists'},
    {id: 'valid-lang', weight: 7, group: 'a11y-language'},
    {id: 'video-caption', weight: 10, group: 'a11y-audio-video'},
    // Manual audits
    {id: 'focusable-controls', weight: 0},
    {id: 'interactive-element-affordance', weight: 0},
    {id: 'logical-tab-order', weight: 0},
    {id: 'visual-order-follows-dom', weight: 0},
    {id: 'focus-traps', weight: 0},
    {id: 'managed-focus', weight: 0},
    {id: 'use-landmarks', weight: 0},
    {id: 'offscreen-content-hidden', weight: 0},
    {id: 'custom-controls-labels', weight: 0},
    {id: 'custom-controls-roles', weight: 0},
    // Hidden audits
    {id: 'empty-heading', weight: 0, group: 'hidden'},
    {id: 'identical-links-same-purpose', weight: 0, group: 'hidden'},
    {id: 'landmark-one-main', weight: 0, group: 'hidden'},
    {id: 'target-size', weight: 0, group: 'hidden'},
    // and so on, see the full list here: https://github.com/GoogleChrome/lighthouse/blob/main/lighthouse-core/config/default-config.js#L309
  ];

 class AccessibilityAudit extends Audit {
   static get meta() {
     return {
       id: 'accessibility-audit',
       title: 'Passed all accessibility checks',
       failureTitle: 'Failed some accessibility checks',
       description: 'Detects if the web page meets the accessibility standards and guidelines',
 
       // The name of the custom gatherer class that provides input to this audit.
       requiredArtifacts: ['accessibility-gatherer'],
     };
   }
 
   static audit(artifacts) {
       // Loop through the standards and check if the web page meets them
     let score = 0;
     let details = [];
     for (const standard of accessibilityStandards) {
        // Check if the web page passes the standard
        const pass = accessibilityInfo[standard.id];
        // Calculate the score based on the weight and the pass/fail result
        score += standard.weight * (pass ? 1 : 0);
        // Create a detail object for the audit result
        const detail = {
        standard: standard.id,
        group: standard.group,
        pass: pass,
        // You can add more information and formatting here, such as explanations, suggestions, or links
       };

        // Add the detail object to the details array
        details.push(detail);
        }

        // Normalize the score to a value between 0 and 1
        score = score / accessibilityStandards.reduce((sum, standard) => sum + standard.weight, 0);
 
       // Return the audit result object
     return {
        score: score,
        details: Audit.makeItemDetails(details),
     };
   }
 }
 
 export default AccessibilityAudit;