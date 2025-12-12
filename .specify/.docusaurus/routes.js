import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/login',
    component: ComponentCreator('/login', 'a8c'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'ec6'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '352'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '41e'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-1-ros2/',
                component: ComponentCreator('/docs/modules/module-1-ros2/', 'c82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-1-ros2/nodes-topics-services',
                component: ComponentCreator('/docs/modules/module-1-ros2/nodes-topics-services', 'e6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-1-ros2/rclpy-python-agent',
                component: ComponentCreator('/docs/modules/module-1-ros2/rclpy-python-agent', '974'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-1-ros2/urdf-humanoid',
                component: ComponentCreator('/docs/modules/module-1-ros2/urdf-humanoid', '987'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-2-digital-twin/',
                component: ComponentCreator('/docs/modules/module-2-digital-twin/', '91f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-2-digital-twin/gazebo-physics',
                component: ComponentCreator('/docs/modules/module-2-digital-twin/gazebo-physics', '20d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-2-digital-twin/sensor-simulation',
                component: ComponentCreator('/docs/modules/module-2-digital-twin/sensor-simulation', '534'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-2-digital-twin/unity-rendering',
                component: ComponentCreator('/docs/modules/module-2-digital-twin/unity-rendering', 'eb0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-3-ai-brain/',
                component: ComponentCreator('/docs/modules/module-3-ai-brain/', '0b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-3-ai-brain/isaac-ros-pipelines',
                component: ComponentCreator('/docs/modules/module-3-ai-brain/isaac-ros-pipelines', 'a99'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-3-ai-brain/isaac-sim',
                component: ComponentCreator('/docs/modules/module-3-ai-brain/isaac-sim', '94f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-3-ai-brain/nav2-bipedal',
                component: ComponentCreator('/docs/modules/module-3-ai-brain/nav2-bipedal', '850'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-4-vla/',
                component: ComponentCreator('/docs/modules/module-4-vla/', 'd0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-4-vla/autonomous-humanoid',
                component: ComponentCreator('/docs/modules/module-4-vla/autonomous-humanoid', '3fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-4-vla/llm-cognitive-planning',
                component: ComponentCreator('/docs/modules/module-4-vla/llm-cognitive-planning', '18c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modules/module-4-vla/whisper-voice-action',
                component: ComponentCreator('/docs/modules/module-4-vla/whisper-voice-action', 'a5d'),
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
    path: '*',
    component: ComponentCreator('*'),
  },
];
