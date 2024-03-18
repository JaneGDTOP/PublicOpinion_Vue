import NeoVis from 'neovis.js'
export default {
  containerId: 'viz',
  neo4j: {
    serverUrl: 'bolt://172.20.137.248:7687',
    serverUser: 'neo4j',
    serverPassword: 'neo4jneo4j'
  },
  visConfig: {
    edges: {
      arrows: {
        to: { enabled: true }
      }
    }
  },
  labels: {
    entity: {
      label: 'name',
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: { // here you put node properties that aren't mapped directly from the neo4j node
        // cypher: { // everything here will map to the vis.js node object from a cypher query (like sizeCypher worked but for every property)
        //   value: 'MATCH (n) WHERE id(n) = $id MATCH (n)-[r]-() RETURN sum(r.weight) AS c'
        // },
        // function: { // everything here will map function thats gets the neo4j node properties to a vis.js node property
        //   // title: NeoVis.objectToTitleHtml, // alternativly
        //   label: (props) => (NeoVis.objectToTitleString(props, ['name'])).substring(5),
        //   image: (props) => 'https://visjs.org/images/visjs_logo.png' + ((NeoVis.objectToTitleString(props, ['name'])).substring(100))
        // },
        static: { // everything here will be copied directly to the vis.js's node object
          font: {
            size: 26,
            color: '#000000'
          },
          size: 100,
          color: '#43a0e3',
          shape: 'circle',
          circle: {
            size: 100
          }
          // image: 'https://visjs.org/images/visjs_logo.png'
          // image: 'https://visjs.org/images/1.png'
        }
      }
    },
    sentence: {
      label: 'name',
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: { // here you put node properties that aren't mapped directly from the neo4j node
        // cypher: { // everything here will map to the vis.js node object from a cypher query (like sizeCypher worked but for every property)
        //   value: 'MATCH (n) WHERE id(n) = $id MATCH (n)-[r]-() RETURN sum(r.weight) AS c'
        // },
        function: { // everything here will map function thats gets the neo4j node properties to a vis.js node property
          // title: NeoVis.objectToTitleHtml, // alternativly
          label: (props) => (NeoVis.objectToTitleString(props, ['name'])).slice(5, 15) + '...',
          image: (props) => 'static/image-ourself/' + /"(.*?)"/.exec((NeoVis.objectToTitleString(props, ['image'])))[1]
        },
        static: { // everything here will be copied directly to the vis.js's node object
          font: {
            size: 26,
            color: '#000000'
          },
          size: 100,
          color: '#43a0e3',
          shape: 'circularImage',
          widthConstraint: {
            minimum: 10,
            maxmum: 10
          },
          // image: 'https://visjs.org/images/visjs_logo.png'
          // image: '../../../../assets/images/555.jpg'
          // image: 'assets/static/image-ourself/war_151_0.jpg'
          image: 'static/image-ourself/war_151_0.jpg',
          imagePadding: {
            left: 2,
            top: 2,
            bottom: 2,
            right: 2
          }
          // image: 'https://s11.ax1x.com/2024/01/25/pFm4Al6.jpg'
          // image: 'https://s11.ax1x.com/2024/01/25/pFm4Al6.jpg'
        }
      }
    },
    trigger: {
      label: 'name',
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: { // here you put node properties that aren't mapped directly from the neo4j node
        // cypher: { // everything here will map to the vis.js node object from a cypher query (like sizeCypher worked but for every property)
        //   value: 'MATCH (n) WHERE id(n) = $id MATCH (n)-[r]-() RETURN sum(r.weight) AS c'
        // },
        // function: { // everything here will map function thats gets the neo4j node properties to a vis.js node property
        //   // title: NeoVis.objectToTitleHtml, // alternativly
        //   // label: (props) => (NeoVis.objectToTitleString(props, ['name'])).substring(5),
        //   image: (props) => 'static/image-ourself/' + /"(.*?)"/.exec((NeoVis.objectToTitleString(props, ['image'])))[1]
        // },
        static: { // everything here will be copied directly to the vis.js's node object
          font: {
            size: 26,
            color: '#000000'
          },
          size: 100,
          color: '#EEEEEE',
          shape: 'circle'
          // image: 'https://visjs.org/images/visjs_logo.png'
          // image: '../../../../assets/images/555.jpg'
          // image: 'assets/static/image-ourself/war_151_0.jpg'
          // image: 'static/image-ourself/war_151_0.jpg'
          // image: 'https://s11.ax1x.com/2024/01/25/pFm4Al6.jpg'
          // image: 'https://s11.ax1x.com/2024/01/25/pFm4Al6.jpg'
        }
      }
    }
  },
  relationships: {
    Agent: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Artifact: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Attacker: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Coref: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Country: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Demostrator: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Destination: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Giver: {
      label: 'type',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Instrument: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Money: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Organization: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Origin: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Participant: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Person: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Place: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Recipient: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Target: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Time: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    Victim: {
      label: 'name',
      font: {
        size: 26,
        color: '#000000'
      }
    },
    entity: {
      label: 'type'
    },
    trigger: {
      label: 'type'
    }
  },
  arrows: true,
  initialCypher: 'MATCH p=()-[r:entity]->() RETURN p LIMIT 300',
  option: [
    {
      value: 'MATCH (n:entity) RETURN n LIMIT 300',
      label: '检索前300个实体节点'
    },
    {
      value: 'MATCH (n:sentence) RETURN n LIMIT 100',
      label: '检索100个实体节点'
    },
    {
      value: 'MATCH p = (s1:sentence)-[r]-() RETURN p LIMIT 100',
      label: '检索前100个实体节点'
    }
  ]
}
