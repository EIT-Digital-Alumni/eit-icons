// svgo.config.mjs - Simple version
export default {
    plugins: [
      'convertStyleToAttrs',
      'removeUselessDefs', 
      'cleanupIds',
      'removeUnusedNS',
      'removeDimensions',
      
      // Custom plugin to replace your specific blue color
      {
        name: 'replaceBlueWithCurrent',
        fn: () => {
          return {
            element: {
              enter: (node) => {
                // Replace #254aa5 (your blue) with currentColor
                const targetColor = '#254aa5';
                
                ['fill', 'stroke'].forEach(attr => {
                  if (node.attributes[attr] && 
                      node.attributes[attr].toLowerCase() === targetColor) {
                    node.attributes[attr] = 'currentColor';
                  }
                });
                
                // Handle inline styles
                if (node.attributes.style) {
                  node.attributes.style = node.attributes.style
                    .replace(/fill:\s*#254aa5/gi, 'fill:currentColor')
                    .replace(/stroke:\s*#254aa5/gi, 'stroke:currentColor');
                }
              }
            }
          };
        }
      }
    ]
  };