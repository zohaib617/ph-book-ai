import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ur/docs',
    component: ComponentCreator('/ur/docs', 'add'),
    routes: [
      {
        path: '/ur/docs',
        component: ComponentCreator('/ur/docs', 'f52'),
        routes: [
          {
            path: '/ur/docs',
            component: ComponentCreator('/ur/docs', '46a'),
            routes: [
              {
                path: '/ur/docs/category/speed-insights',
                component: ComponentCreator('/ur/docs/category/speed-insights', '18e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/intro/',
                component: ComponentCreator('/ur/docs/intro/', '222'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-1-ros2/',
                component: ComponentCreator('/ur/docs/modules/module-1-ros2/', 'e6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-1-ros2/nodes-topics-services',
                component: ComponentCreator('/ur/docs/modules/module-1-ros2/nodes-topics-services', 'a28'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-1-ros2/rclpy-python-agent',
                component: ComponentCreator('/ur/docs/modules/module-1-ros2/rclpy-python-agent', '9cf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-1-ros2/urdf-humanoid',
                component: ComponentCreator('/ur/docs/modules/module-1-ros2/urdf-humanoid', '76f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-2-digital-twin/',
                component: ComponentCreator('/ur/docs/modules/module-2-digital-twin/', '213'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-2-digital-twin/gazebo-physics',
                component: ComponentCreator('/ur/docs/modules/module-2-digital-twin/gazebo-physics', '0a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-2-digital-twin/sensor-simulation',
                component: ComponentCreator('/ur/docs/modules/module-2-digital-twin/sensor-simulation', 'ffe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-2-digital-twin/unity-rendering',
                component: ComponentCreator('/ur/docs/modules/module-2-digital-twin/unity-rendering', 'e94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-3-ai-brain/',
                component: ComponentCreator('/ur/docs/modules/module-3-ai-brain/', 'e0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-3-ai-brain/isaac-ros-pipelines',
                component: ComponentCreator('/ur/docs/modules/module-3-ai-brain/isaac-ros-pipelines', '467'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-3-ai-brain/isaac-sim',
                component: ComponentCreator('/ur/docs/modules/module-3-ai-brain/isaac-sim', '895'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-3-ai-brain/nav2-bipedal',
                component: ComponentCreator('/ur/docs/modules/module-3-ai-brain/nav2-bipedal', '6d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-4-vla/',
                component: ComponentCreator('/ur/docs/modules/module-4-vla/', '066'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-4-vla/autonomous-humanoid',
                component: ComponentCreator('/ur/docs/modules/module-4-vla/autonomous-humanoid', '39a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-4-vla/llm-cognitive-planning',
                component: ComponentCreator('/ur/docs/modules/module-4-vla/llm-cognitive-planning', '02d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/modules/module-4-vla/whisper-voice-action',
                component: ComponentCreator('/ur/docs/modules/module-4-vla/whisper-voice-action', '8be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/frameworks',
                component: ComponentCreator('/ur/docs/speed-insights/frameworks', 'ca1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/getting-started',
                component: ComponentCreator('/ur/docs/speed-insights/getting-started', '5b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/limits-and-pricing',
                component: ComponentCreator('/ur/docs/speed-insights/limits-and-pricing', 'ff8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/metrics',
                component: ComponentCreator('/ur/docs/speed-insights/metrics', '119'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/optimization',
                component: ComponentCreator('/ur/docs/speed-insights/optimization', '88f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/package',
                component: ComponentCreator('/ur/docs/speed-insights/package', '816'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/privacy-policy',
                component: ComponentCreator('/ur/docs/speed-insights/privacy-policy', 'ec4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/speed-insights/troubleshooting',
                component: ComponentCreator('/ur/docs/speed-insights/troubleshooting', '847'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/ur/',
    component: ComponentCreator('/ur/', '3b1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
