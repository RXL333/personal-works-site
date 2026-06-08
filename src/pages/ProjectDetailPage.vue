<template>
  <main
    ref="pageRoot"
    class="page-shell project-case-page"
    :class="project ? [`project-case-${project.slug}`, config.themeClass] : 'project-case-missing'"
  >
    <RouterLink class="corner-return" to="/code" aria-label="返回编程作品">
      <span aria-hidden="true">←</span>
    </RouterLink>

    <template v-if="project?.slug === 'ai-study-helper'">
      <section class="ai-case-hero">
        <div class="ai-case-hero-copy">
          <p class="eyebrow">Warm Learning Desk</p>
          <h1>AI 学习助手</h1>
          <p>
            这不是一个孤立的 AI 聊天框，而是一张会把提问、练习、错题、复习、历史和导图都收拢起来的学习工作台。
          </p>
          <div class="ai-case-hero-actions">
            <button type="button" @click="scrollToSection('ai-loop')">查看学习闭环</button>
            <button type="button" @click="scrollToSection('ai-records')">浏览学习记录</button>
          </div>
        </div>

        <div class="ai-case-hero-board">
          <figure class="ai-case-main-shot">
            <img :src="project.heroImage" alt="AI 学习助手首页截图" />
            <figcaption>
              <span>学习助手首页</span>
              <strong>从工作台进入完整学习闭环</strong>
            </figcaption>
          </figure>

          <aside class="ai-case-overview-card">
            <p class="eyebrow">Project Snapshot</p>
            <h2>项目速览</h2>
            <dl>
              <div v-for="row in overviewRows" :key="`ai-${row.label}`">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section class="ai-case-metrics" aria-label="AI 学习助手关键数据">
        <article v-for="(metric, index) in config.metrics" :key="metric.label" :class="`ai-metric-${index + 1}`">
          <strong class="js-count" :data-target="metric.value">0</strong>
          <span>{{ metric.label }}</span>
          <small>{{ metric.note }}</small>
        </article>
      </section>

      <section
        id="ai-loop"
        ref="flowRef"
        class="ai-case-loop"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="ai-case-loop-head">
          <p class="eyebrow">Learning Loop</p>
          <h2>一次学习如何继续生长</h2>
          <p>提问只是起点。这个页面更想展示的是：知识点如何继续进入练习、错题、复习、历史和导图。</p>
        </div>

        <div class="ai-case-loop-line" aria-hidden="true"></div>
        <div class="ai-case-loop-nodes">
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </section>

      <section id="ai-records" class="ai-case-records">
        <div class="ai-case-section-head">
          <p class="eyebrow">Learning Records</p>
          <h2>像学习记录一样逐张展开</h2>
          <p>截图按真实使用顺序排布，每一张都对应学习闭环里的一个位置，而不是普通的图片列表。</p>
        </div>

        <div class="ai-case-record-stack">
          <figure v-for="(shot, index) in projectScreenshots" :key="shot.src" class="ai-record-card">
            <span class="ai-record-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <img :src="shot.src" :alt="shot.title" loading="lazy" />
            <figcaption>
              <small>{{ shot.focus ?? '学习场景' }}</small>
              <strong>{{ shot.title }}</strong>
              <p>{{ shot.caption }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="ai-case-tech">
        <div class="ai-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>技术实现</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="ai-case-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="ai-case-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="ai-case-diagrams">
        <div class="ai-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>学习闭环与数据链路</h2>
          <p>说明图用来解释它为什么不是聊天框，以及前端、后端、数据库和 AI 接口如何一起工作。</p>
        </div>

        <div class="ai-case-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="ai-case-retro">
        <div class="ai-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目最适合展示综合能力：产品流程、全栈实现、AI 接入和学习场景理解同时存在。</p>
        </div>

        <div class="ai-case-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project?.slug === 'gesture-particles'">
      <section class="particle-case-hero">
        <img class="particle-case-hero-bg" :src="project.heroImage" alt="" aria-hidden="true" />
        <div class="particle-case-orbit" aria-hidden="true">
          <span v-for="index in 18" :key="index"></span>
        </div>
        <div class="particle-case-hero-copy">
          <p class="eyebrow">Realtime Particle Stage</p>
          <h1>粒子手势交互网页</h1>
          <p>把摄像头里的手势变成 WebGL 粒子运动，页面像一个能被身体动作点亮的实时交互舞台。</p>
          <div class="particle-case-actions">
            <button type="button" @click="scrollToSection('particle-scenes')">进入粒子舞台</button>
            <button type="button" @click="scrollToSection('particle-pipeline')">查看技术链路</button>
          </div>
        </div>

        <aside class="particle-case-overview">
          <p class="eyebrow">Project Snapshot</p>
          <dl>
            <div v-for="row in overviewRows" :key="`particle-${row.label}`">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="particle-scenes" class="particle-case-scenes">
        <div class="particle-case-section-head">
          <p class="eyebrow">Modes</p>
          <h2>四种粒子状态像灯光一样切换</h2>
          <p>爱心、花朵、烟花和表白模式分别展示不同的粒子性格，让页面不再是普通文档，而是沉浸式交互舞台。</p>
        </div>

        <div class="particle-scene-grid">
          <figure
            v-for="(shot, index) in projectScreenshots"
            :key="shot.src"
            class="particle-scene-card"
            :class="{ 'is-wide': index === 0 }"
          >
            <img :src="shot.src" :alt="shot.title" loading="lazy" />
            <figcaption>
              <span>{{ shot.focus ?? `Mode ${index + 1}` }}</span>
              <strong>{{ shot.title }}</strong>
              <p>{{ shot.caption }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="particle-pipeline"
        ref="flowRef"
        class="particle-case-pipeline"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="particle-case-section-head">
          <p class="eyebrow">Signal Chain</p>
          <h2>摄像头到 Three.js 的发光链路</h2>
          <p>这页的重点是实时识别 + WebGL 视觉表达，所以技术实现被做成一条随滚动点亮的链路。</p>
        </div>

        <div class="particle-pipeline-line" aria-hidden="true"></div>
        <div class="particle-pipeline-nodes">
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </section>

      <section class="particle-case-tech">
        <div class="particle-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>实时交互如何稳定运行</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="particle-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="particle-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="particle-case-diagrams">
        <div class="particle-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>识别链路、状态更新与降级路径</h2>
          <p>说明图补充截图看不到的部分：摄像头权限、手势关键点、状态平滑和 Three.js 粒子渲染如何协作。</p>
        </div>

        <div class="particle-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="particle-case-retro">
        <div class="particle-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目展示的是创意交互和视觉实验能力，重点是身体动作带来的即时反馈。</p>
        </div>

        <div class="particle-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project?.slug === 'pixel-mecha-battle'">
      <section class="mecha-case-hero">
        <div class="mecha-case-hero-copy">
          <p class="eyebrow">Retro Arcade HUD</p>
          <h1>像素机甲对战游戏</h1>
          <p>把项目详情页做成一块复古街机启动屏：键盘输入、血条、攻击、防御和胜负判定都进入同一个战斗 HUD。</p>
          <div class="mecha-case-actions">
            <button type="button" @click="scrollToSection('mecha-battle')">START GAME</button>
            <button type="button" @click="scrollToSection('mecha-loop')">VIEW LOOP</button>
          </div>
        </div>

        <div class="mecha-case-cabinet">
          <div class="mecha-case-screen">
            <img :src="project.heroImage" alt="像素机甲对战游戏启动界面" />
            <div class="mecha-screen-glow" aria-hidden="true"></div>
          </div>
          <div class="mecha-case-controls" aria-label="街机控制台装饰">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      <section class="mecha-case-overview">
        <aside class="mecha-case-table">
          <p class="eyebrow">Project Snapshot</p>
          <h2>项目速览</h2>
          <dl>
            <div v-for="row in overviewRows" :key="`mecha-${row.label}`">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>

        <div class="mecha-case-hud">
          <article v-for="(metric, index) in config.metrics" :key="metric.label">
            <span>{{ metric.label }}</span>
            <strong class="js-count" :data-target="metric.value">0</strong>
            <small>{{ metric.note }}</small>
            <i :style="{ '--bar-target': `${Math.min(100, metric.value * (index === 0 ? 50 : index === 1 ? 18 : 24))}%` }"></i>
          </article>
        </div>
      </section>

      <section id="mecha-battle" class="mecha-case-battle">
        <div class="mecha-case-section-head">
          <p class="eyebrow">Battle Screens</p>
          <h2>从开始游戏到战斗结算</h2>
          <p>截图像游戏关卡一样展开：启动屏建立气氛，对战页拆解规则，结束页完成胜负闭环。</p>
        </div>

        <div class="mecha-battle-grid">
          <figure
            v-for="(shot, index) in projectScreenshots"
            :key="shot.src"
            class="mecha-shot-card"
            :class="{ 'is-battle': index === 1 }"
          >
            <img :src="shot.src" :alt="shot.title" loading="lazy" />
            <figcaption>
              <span>{{ shot.focus ?? `Stage ${index + 1}` }}</span>
              <strong>{{ shot.title }}</strong>
              <p>{{ shot.caption }}</p>
            </figcaption>
          </figure>
        </div>

        <div class="mecha-rule-panels">
          <article>
            <span>PLAYER 1</span>
            <h3>键盘输入</h3>
            <p>按键事件只维护状态，移动和攻击交给游戏循环逐帧处理，避免输入逻辑和战斗逻辑混在一起。</p>
          </article>
          <article>
            <span>COMBAT</span>
            <h3>攻击 / 防御</h3>
            <p>命中需要同时考虑距离、朝向、冷却和防御状态，规则简单但反馈必须清楚。</p>
          </article>
          <article>
            <span>HUD</span>
            <h3>血条反馈</h3>
            <p>血量变化是玩家理解战局的核心，进入视口时用填充动效把“战斗状态”直接展示出来。</p>
          </article>
        </div>
      </section>

      <section
        id="mecha-loop"
        ref="flowRef"
        class="mecha-case-loop"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="mecha-case-section-head">
          <p class="eyebrow">Game Loop</p>
          <h2>Canvas 循环、输入和碰撞判定</h2>
          <p>页面的技术重点是规则驱动交互：输入记录状态，循环更新世界，碰撞决定伤害，渲染把结果反馈给玩家。</p>
        </div>

        <div class="mecha-loop-track" aria-hidden="true"></div>
        <div class="mecha-loop-grid">
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </section>

      <section class="mecha-case-tech">
        <div class="mecha-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>把规则拆成可以维护的战斗系统</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="mecha-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="mecha-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="mecha-case-diagrams">
        <div class="mecha-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>游戏状态机与战斗判定图</h2>
          <p>说明图负责补足截图看不到的部分：输入如何进入循环，攻击如何判定，胜负如何收束。</p>
        </div>

        <div class="mecha-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="mecha-case-retro">
        <div class="mecha-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目适合展示规则建模、即时反馈和前端游戏循环能力，和后台系统、全栈应用形成明显区分。</p>
        </div>

        <div class="mecha-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project?.slug === 'library-management-system'">
      <section class="library-case-hero">
        <img class="library-case-hero-bg" :src="project.heroImage" alt="" aria-hidden="true" />
        <div class="library-case-hero-copy">
          <p class="eyebrow">Library Admin Console</p>
          <h1>图书管理系统</h1>
          <p>先保留登录页的阳光阅读空间氛围，再进入沉稳的馆务后台控制台，把图书、借阅、读者和公告拆成清晰业务模块。</p>
          <div class="library-case-actions">
            <button type="button" @click="scrollToSection('library-console')">进入控制台拆解</button>
            <button type="button" @click="scrollToSection('library-retro')">查看复盘总结</button>
          </div>
        </div>

        <aside class="library-case-login-card">
          <span>Login Entrance</span>
          <strong>{{ project.date }} · {{ project.category }}</strong>
          <p>登录页承担系统气质：不是冰冷后台，而是一套面向图书馆阅读空间的管理入口。</p>
        </aside>
      </section>

      <section class="library-case-overview">
        <aside class="library-case-table">
          <p class="eyebrow">Project Snapshot</p>
          <h2>项目速览</h2>
          <dl>
            <div v-for="row in overviewRows" :key="`library-${row.label}`">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>

        <div class="library-case-metrics">
          <article v-for="metric in config.metrics" :key="metric.label">
            <strong class="js-count" :data-target="metric.value">0</strong>
            <span>{{ metric.label }}</span>
            <small>{{ metric.note }}</small>
          </article>
        </div>
      </section>

      <section id="library-console" class="library-console-layout">
        <aside class="library-module-nav">
          <p class="eyebrow">02 管理后台</p>
          <button
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            type="button"
            :class="{ 'is-active': index === activeFlowIndex }"
            @click="scrollToSection(`library-module-${index}`)"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ step.title }}
          </button>
        </aside>

        <div class="library-module-stack">
          <section
            v-for="(step, index) in config.flowSteps"
            :id="`library-module-${index}`"
            :key="step.title"
            class="library-module-section"
          >
            <div class="library-module-copy">
              <p class="eyebrow">{{ String(index + 1).padStart(2, '0') }} / {{ step.title }}</p>
              <h2>{{ index === 0 ? '馆务状态先被汇总到仪表盘' : `${step.title}承接具体馆务操作` }}</h2>
              <p>{{ step.copy }}</p>
              <ul>
                <li v-for="item in project.features.slice(Math.max(0, index), Math.max(0, index) + 3)" :key="`${step.title}-${item}`">
                  {{ item }}
                </li>
              </ul>
            </div>

            <figure class="library-module-shot">
              <img
                :src="projectScreenshots[index + 1]?.src ?? project.heroImage"
                :alt="projectScreenshots[index + 1]?.title ?? step.title"
                loading="lazy"
              />
              <figcaption>
                <strong>{{ projectScreenshots[index + 1]?.title ?? step.title }}</strong>
                <span>{{ projectScreenshots[index + 1]?.caption ?? step.copy }}</span>
              </figcaption>
            </figure>

            <div class="library-module-board">
              <div class="library-trend-card">
                <span>近 6 周借阅趋势</span>
                <strong>{{ index === 0 ? '158' : index === 1 ? '71.5%' : index === 2 ? '5' : index === 3 ? '113' : '5' }}</strong>
                <svg viewBox="0 0 320 120" aria-hidden="true">
                  <path class="library-trend-grid" d="M10 96H310M10 66H310M10 36H310" />
                  <path class="library-trend-path" d="M12 88 C48 74 58 82 86 64 S132 46 162 58 S212 84 244 52 S286 30 310 44" />
                </svg>
              </div>

              <div class="library-table-card" aria-label="示例后台表格">
                <div v-for="rowIndex in 4" :key="rowIndex" class="library-table-row">
                  <span>{{ step.title }}</span>
                  <strong>{{ ['库存联动', '状态更新', '权限校验', '记录追踪'][rowIndex - 1] }}</strong>
                  <small>{{ ['正常', '待处理', '可编辑', '已同步'][rowIndex - 1] }}</small>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section class="library-case-tech">
        <div class="library-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>后台业务建模、借阅流程和库存联动</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="library-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="library-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="library-case-diagrams">
        <div class="library-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>馆务模块和借阅流程说明图</h2>
          <p>说明图用来补足截图看不到的业务关系：模块如何组织、借阅如何流转、接口和数据对象如何关联。</p>
        </div>

        <div class="library-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="library-retro" class="library-case-retro">
        <div class="library-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目不是靠花哨视觉取胜，而是靠后台模块、业务对象、借阅流程和可维护的信息密度来体现价值。</p>
        </div>

        <div class="library-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project?.slug === 'xuexi-helper-extension'">
      <section class="extension-case-hero">
        <div class="extension-webpage-bg" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <div></div>
        </div>

        <div class="extension-case-hero-copy">
          <p class="eyebrow">Chrome Extension Panel</p>
          <h1>学习通练习助手浏览器扩展</h1>
          <p>把浏览器扩展说明页做成一个从网页右侧滑出的插件面板：作业模式、章节模式和收起状态都贴近真实网页运行场景。</p>
          <div class="extension-case-actions">
            <button type="button" @click="scrollToSection('extension-states')">查看三种状态</button>
            <button type="button" @click="scrollToSection('extension-safe-flow')">查看安全流程</button>
          </div>
        </div>

        <div class="extension-browser-stage">
          <div class="extension-browser-bar">
            <i></i>
            <i></i>
            <i></i>
            <span>chaoxing.example.com / exercises</span>
          </div>
          <div class="extension-browser-page">
            <div class="extension-page-lines" aria-hidden="true">
              <span v-for="index in 7" :key="index"></span>
            </div>
            <figure class="extension-floating-panel">
              <img :src="project.heroImage" alt="学习通练习助手扩展配置面板" />
              <figcaption>
                <strong>扩展首页配置面板</strong>
                <span>API Key、模型、模式、延迟和测试连接集中在弹出面板里。</span>
              </figcaption>
            </figure>
            <div class="extension-capsule" aria-hidden="true">
              <span></span>
              学习助手运行中
            </div>
          </div>
        </div>
      </section>

      <section class="extension-case-overview">
        <aside class="extension-case-table">
          <p class="eyebrow">Project Snapshot</p>
          <h2>项目速览</h2>
          <dl>
            <div v-for="row in overviewRows" :key="`extension-${row.label}`">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>

        <div class="extension-case-metrics">
          <article v-for="metric in config.metrics" :key="metric.label">
            <strong class="js-count" :data-target="metric.value">0</strong>
            <span>{{ metric.label }}</span>
            <small>{{ metric.note }}</small>
          </article>
        </div>
      </section>

      <section id="extension-states" class="extension-case-states">
        <div class="extension-case-section-head">
          <p class="eyebrow">Panel States</p>
          <h2>作业模式、章节模式和收起状态</h2>
          <p>扩展不是独立网页，而是贴着原网页运行的辅助面板，所以状态展示要像真实插件一样从右侧展开、切换和收起。</p>
        </div>

        <div class="extension-state-grid">
          <figure
            v-for="(shot, index) in projectScreenshots.slice(1)"
            :key="shot.src"
            class="extension-state-card"
            :class="{ 'is-capsule': index === 2 }"
          >
            <img :src="shot.src" :alt="shot.title" loading="lazy" />
            <figcaption>
              <span>{{ shot.focus ?? `状态 ${index + 1}` }}</span>
              <strong>{{ shot.title }}</strong>
              <p>{{ shot.caption }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="extension-safe-flow"
        ref="flowRef"
        class="extension-case-flow"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="extension-case-section-head">
          <p class="eyebrow">Safe Assistant Flow</p>
          <h2>识别题目 -> AI 解析 -> 展示答案 -> 人工确认</h2>
          <p>关键不是把动作藏起来自动完成，而是让用户清楚看到每一步，并保留最终确认权。</p>
        </div>

        <div class="extension-flow-track" aria-hidden="true"></div>
        <div class="extension-flow-grid">
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </section>

      <section class="extension-case-tech">
        <div class="extension-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>MV3 生命周期、DOM 适配和安全边界</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="extension-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="extension-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="extension-case-diagrams">
        <div class="extension-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>扩展结构与安全辅助流程</h2>
          <p>说明图用来解释 popup、background、content scripts 和 AI 接口之间的分工，以及为什么不做自动提交。</p>
        </div>

        <div class="extension-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="extension-case-retro">
        <div class="extension-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目最适合展示浏览器扩展、网页 DOM 适配、AI 辅助工具和安全边界意识。</p>
        </div>

        <div class="extension-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project?.slug === 'campus-secondhand-market'">
      <section class="campus-case-hero">
        <div class="campus-hero-copy">
          <p class="eyebrow">Campus Trade Routes</p>
          <h1>校园二手交易平台</h1>
          <p>
            这一页把项目做成一张校园交易动线地图：首页负责建立校园气质，商品卡承接买家浏览，发布表单承接卖家上架，后台再用独立的蓝紫色管理视角收束整个平台。
          </p>
          <div class="campus-hero-actions">
            <button type="button" @click="scrollToSection('campus-routes')">查看交易路线</button>
            <button type="button" @click="scrollToSection('campus-admin')">查看后台管理</button>
          </div>
        </div>

        <figure class="campus-hero-shot">
          <img :src="project.heroImage" alt="校园二手交易平台首页截图" />
          <figcaption>
            <span>首页轮播与分类入口</span>
            <strong>先建立轻松的校园闲置交易氛围</strong>
          </figcaption>
        </figure>
      </section>

      <section class="campus-case-overview">
        <aside class="campus-case-table">
          <p class="eyebrow">Project Snapshot</p>
          <h2>项目速览</h2>
          <dl>
            <div v-for="row in overviewRows" :key="`campus-${row.label}`">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>

        <div class="campus-case-metrics">
          <article v-for="metric in config.metrics" :key="metric.label">
            <strong class="js-count" :data-target="metric.value">0</strong>
            <span>{{ metric.label }}</span>
            <small>{{ metric.note }}</small>
          </article>
        </div>
      </section>

      <section
        id="campus-routes"
        ref="flowRef"
        class="campus-case-routes"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="campus-route-head">
          <p class="eyebrow">Trade Routes</p>
          <h2>把页面组织成两条校园交易路线</h2>
          <p>
            前台部分最重要的是让用户知道下一步该去哪：买家从首页和分类进入商品列表，再查看商品信息并联系卖家；卖家从登录进入个人中心，再发布物品并回看自己的发布记录。
          </p>
        </div>

        <div class="campus-route-map" aria-label="校园交易路线滚动进度">
          <div class="campus-route-track" aria-hidden="true"></div>
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            class="campus-route-node"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>

        <div class="campus-route-focus">
          <div class="campus-focus-copy">
            <p class="eyebrow">{{ String(activeFlowIndex + 1).padStart(2, '0') }} / {{ campusRouteDetails[activeFlowIndex]?.label }}</p>
            <h3>{{ campusRouteDetails[activeFlowIndex]?.title }}</h3>
            <p>{{ campusRouteDetails[activeFlowIndex]?.copy }}</p>
            <ul>
              <li v-for="item in campusRouteDetails[activeFlowIndex]?.points" :key="item">{{ item }}</li>
            </ul>
          </div>
          <figure class="campus-focus-shot">
            <img
              :src="campusRouteDetails[activeFlowIndex]?.image ?? project.heroImage"
              :alt="campusRouteDetails[activeFlowIndex]?.title ?? project.title"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section class="campus-case-paths">
        <div class="campus-case-section-head">
          <p class="eyebrow">Buyer & Seller</p>
          <h2>买家路线和卖家路线分开阅读</h2>
          <p>平台不只是把页面罗列出来，而是让读者顺着两类用户的目标理解项目：一边是寻找、比较和联系，一边是登录、发布和管理。</p>
        </div>

        <div class="campus-path-grid">
          <article>
            <span>Buyer Route</span>
            <h3>买家浏览路径</h3>
            <dl>
              <div v-for="item in campusBuyerRoute" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.copy }}</dd>
              </div>
            </dl>
          </article>

          <article>
            <span>Seller Route</span>
            <h3>卖家发布路径</h3>
            <dl>
              <div v-for="item in campusSellerRoute" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.copy }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section class="campus-case-products">
        <div class="campus-case-section-head">
          <p class="eyebrow">Product Cards</p>
          <h2>商品卡片承接图片、价格和卖家信息</h2>
          <p>这里保留绿色校园感，用像闲置商品卡一样的排布展示列表、发布、个人中心和登录入口。价格标签会在滚动进入视口时弹出，强化交易平台的产品属性。</p>
        </div>

        <div class="campus-product-grid">
          <figure v-for="card in campusProductCards" :key="card.src" class="campus-product-card">
            <img :src="card.src" :alt="card.title" loading="lazy" />
            <figcaption>
              <span class="campus-price-tag">{{ card.price }}</span>
              <small>{{ card.focus }}</small>
              <strong>{{ card.title }}</strong>
              <p>{{ card.caption }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="campus-admin" class="campus-case-admin">
        <div class="campus-admin-copy">
          <p class="eyebrow">Admin Contrast</p>
          <h2>后台用蓝紫渐变和前台拉开角色差异</h2>
          <p>
            用户端负责轻松浏览和发布，管理员端则承担数据维护。这里故意切换到蓝紫色控制台氛围，让读者一眼看出“前台交易流程”和“后台管理能力”的分工。
          </p>
          <div class="campus-admin-badges">
            <span>用户维护</span>
            <span>物品审核</span>
            <span>数据统计</span>
          </div>
        </div>
        <figure class="campus-admin-shot">
          <img :src="projectScreenshots[4]?.src ?? project.heroImage" alt="校园二手交易平台管理员后台截图" loading="lazy" />
          <figcaption>
            <strong>{{ projectScreenshots[4]?.title ?? '管理员后台' }}</strong>
            <span>{{ projectScreenshots[4]?.caption ?? '后台负责维护用户和物品数据。' }}</span>
          </figcaption>
        </figure>
      </section>

      <section class="campus-case-tech">
        <div class="campus-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>多页面组织、商品信息结构和后台分区</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="campus-tech-grid">
          <article v-for="note in config.techNotes" :key="note.title">
            <span>{{ note.label }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.copy }}</p>
          </article>
        </div>

        <div class="campus-stack">
          <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
        </div>
      </section>

      <section class="campus-case-diagrams">
        <div class="campus-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>页面地图、用户路径和后台职责</h2>
          <p>说明图补充截图看不到的结构关系：页面如何连接、用户如何完成交易、后台如何承担平台维护。</p>
        </div>

        <div class="campus-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="campus-case-retro">
        <div class="campus-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>这个项目适合展示多页面组织、交易路径表达和前后台视觉差异，而不是只展示几个页面截图。</p>
        </div>

        <div class="campus-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <template v-else-if="project">
      <section class="project-case-hero">
        <div class="project-case-hero-copy">
          <p class="eyebrow">{{ config.kicker }}</p>
          <h1>{{ project.title }}</h1>
          <p class="project-case-lead">{{ config.lead }}</p>
          <div class="project-case-actions">
            <button type="button" @click="scrollToSection('project-overview')">项目速览</button>
            <button type="button" @click="scrollToSection('project-features')">功能展示</button>
            <button type="button" @click="scrollToSection('project-retro')">复盘总结</button>
          </div>
        </div>

        <div class="project-case-hero-media">
          <figure class="project-case-device">
            <img :src="project.heroImage" :alt="`${project.title} 首屏截图`" />
            <figcaption>
              <span>{{ config.heroCaption }}</span>
              <strong>{{ project.date }} · {{ project.category }}</strong>
            </figcaption>
          </figure>

          <aside v-if="project.slug === 'ai-study-helper'" class="ai-hero-snapshot" aria-label="AI 学习助手项目速览">
            <p class="eyebrow">Project Snapshot</p>
            <h2>项目速览</h2>
            <dl>
              <div v-for="row in overviewRows" :key="`hero-${row.label}`">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="project-overview" class="project-case-overview">
        <div class="project-case-table">
          <p class="eyebrow">Project Snapshot</p>
          <h2>项目速览</h2>
          <dl>
            <div v-for="row in overviewRows" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="project-case-metrics">
          <article v-for="metric in config.metrics" :key="metric.label" class="project-case-metric">
            <strong class="js-count" :data-target="metric.value">0</strong>
            <span>{{ metric.label }}</span>
            <small>{{ metric.note }}</small>
          </article>
        </div>
      </section>

      <section
        ref="flowRef"
        class="project-case-flow"
        :style="{ '--flow-progress': `${Math.round(flowProgress * 100)}%` }"
      >
        <div class="project-case-section-head">
          <p class="eyebrow">{{ config.flowKicker }}</p>
          <h2>{{ config.flowTitle }}</h2>
          <p>{{ config.flowCopy }}</p>
        </div>

        <div class="project-case-flow-track" aria-hidden="true"></div>
        <div class="project-case-flow-grid">
          <article
            v-for="(step, index) in config.flowSteps"
            :key="step.title"
            :class="{ 'is-active': index === activeFlowIndex, 'is-complete': index < activeFlowIndex }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.copy }}</p>
          </article>
        </div>
      </section>

      <section id="project-features" class="project-case-section project-case-feature-section">
        <div class="project-case-section-head">
          <p class="eyebrow">Feature Gallery</p>
          <h2>{{ config.featureTitle }}</h2>
          <p>{{ config.featureCopy }}</p>
        </div>

        <div class="project-case-feature-grid">
          <figure
            v-for="(shot, index) in projectScreenshots"
            :key="shot.src"
            class="project-case-shot"
            :class="{ 'is-featured': index === 0 }"
          >
            <img :src="shot.src" :alt="shot.title" loading="lazy" />
            <figcaption>
              <span>{{ shot.focus ?? `截图 ${index + 1}` }}</span>
              <strong>{{ shot.title }}</strong>
              <p>{{ shot.caption }}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="project-case-section project-case-tech">
        <div class="project-case-section-head">
          <p class="eyebrow">Technical Notes</p>
          <h2>技术实现</h2>
          <p>{{ config.techIntro }}</p>
        </div>

        <div class="project-case-tech-layout">
          <div class="project-case-stack">
            <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
          </div>

          <div class="project-case-tech-cards">
            <article v-for="note in config.techNotes" :key="note.title">
              <span>{{ note.label }}</span>
              <h3>{{ note.title }}</h3>
              <p>{{ note.copy }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="project-case-section project-case-diagrams">
        <div class="project-case-section-head">
          <p class="eyebrow">Diagrams</p>
          <h2>{{ config.diagramTitle }}</h2>
          <p>{{ config.diagramCopy }}</p>
        </div>

        <div class="project-case-diagram-grid">
          <figure v-for="image in project.detailImages" :key="image.src" class="project-case-diagram">
            <img :src="image.src" :alt="`${project.title} - ${image.title}`" loading="lazy" />
            <figcaption>
              <strong>{{ image.title }}</strong>
              <span>{{ image.caption }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="project-retro" class="project-case-section project-case-retro">
        <div class="project-case-section-head">
          <p class="eyebrow">Review</p>
          <h2>复盘总结</h2>
          <p>{{ config.retroLead }}</p>
        </div>

        <div class="project-case-readme">
          <article v-for="(paragraph, index) in detailParagraphs" :key="index">
            <h3>{{ readmeTitles[index] ?? `补充说明 ${index + 1}` }}</h3>
            <p>{{ paragraph }}</p>
          </article>
        </div>
      </section>
    </template>

    <section v-else class="glass-panel missing-project">
      <h1>没有找到这个编程作品</h1>
      <p>可能是作品路径已经调整，回到编程页重新选择一个项目。</p>
      <RouterLink class="soft-link compact" to="/code">返回编程作品</RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import TagChip from '@/components/common/TagChip.vue'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { projects } from '@/data/projects'

type Metric = {
  label: string
  value: number
  note: string
}

type FlowStep = {
  title: string
  copy: string
}

type TechNote = {
  label: string
  title: string
  copy: string
}

type ProjectCaseConfig = {
  themeClass: string
  kicker: string
  lead: string
  heroCaption: string
  metrics: Metric[]
  flowKicker: string
  flowTitle: string
  flowCopy: string
  flowSteps: FlowStep[]
  featureTitle: string
  featureCopy: string
  techIntro: string
  techNotes: TechNote[]
  diagramTitle: string
  diagramCopy: string
  retroLead: string
}

const pageRoot = ref<HTMLElement | null>(null)
const flowRef = ref<HTMLElement | null>(null)
const activeFlowIndex = ref(0)
const flowProgress = ref(0)
const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))

const fallbackConfig: ProjectCaseConfig = {
  themeClass: 'theme-workbook',
  kicker: 'Case Study',
  lead: '这个项目以功能、截图、技术实现和复盘总结组织成可阅读的作品案例。',
  heroCaption: '项目首页',
  metrics: [
    { label: '核心功能', value: 4, note: '按页面能力拆解' },
    { label: '截图记录', value: 4, note: '保留真实界面' },
    { label: '说明图', value: 3, note: '补充结构理解' },
  ],
  flowKicker: 'Project Flow',
  flowTitle: '项目运行路径',
  flowCopy: '用滚动进度把项目中的关键步骤串起来。',
  flowSteps: [
    { title: '入口', copy: '用户从首页进入项目主要场景。' },
    { title: '操作', copy: '核心页面承接主要功能。' },
    { title: '记录', copy: '数据和状态被保存或展示。' },
    { title: '复盘', copy: '用截图和文字解释项目价值。' },
  ],
  featureTitle: '按使用场景展示界面',
  featureCopy: '截图不再只是图片堆叠，而是按真实使用顺序组织。',
  techIntro: '技术实现部分把框架、数据、交互和可扩展方向拆开说明。',
  techNotes: [
    { label: '01', title: '页面结构', copy: '用清晰模块承接用户阅读节奏。' },
    { label: '02', title: '数据组织', copy: '通过项目数据统一驱动详情页内容。' },
    { label: '03', title: '复盘沉淀', copy: '保留后续继续扩展的空间。' },
  ],
  diagramTitle: '结构说明图',
  diagramCopy: '用说明图补充截图无法表达的流程和关系。',
  retroLead: '复盘部分保留项目定位、页面体验、技术实现和下一步方向。',
}

const caseConfigs: Record<string, ProjectCaseConfig> = {
  'ai-study-helper': {
    themeClass: 'theme-workbook',
    kicker: 'Warm Learning Desk',
    lead: '不是把 AI 放进一个聊天框，而是把问答、练习、错题、复习、历史和导图连成可以持续回看的学习闭环。',
    heroCaption: '学习助手首页 · 工作台入口',
    metrics: [
      { label: '学习模块', value: 6, note: '问答、出题、错题、复习、历史、导图' },
      { label: '真实截图', value: 8, note: '覆盖完整学习路径' },
      { label: '说明图', value: 3, note: '解释闭环和数据链路' },
      { label: '技术层', value: 4, note: '前端、后端、数据库、AI 接口' },
    ],
    flowKicker: 'Learning Loop',
    flowTitle: '把一次提问变成长期学习资产',
    flowCopy: '这个流程强调“学习会继续发生”：提问只是起点，后续的练习、纠错和复习才是项目真正的中心。',
    flowSteps: [
      { title: 'AI 问答', copy: '先把问题解释清楚，让用户获得可继续整理的学习材料。' },
      { title: 'AI 出题', copy: '把知识点转成练习题，用检测暴露薄弱环节。' },
      { title: '错题沉淀', copy: '把做错的内容录入错题本，并保留 AI 分析。' },
      { title: '复习中心', copy: '把今日任务和到期复习重新推回学习桌面。' },
      { title: '学习历史', copy: '用时间线把问答、错题和复习记录重新串起来。' },
      { title: '思维导图', copy: '把零散知识整理成可保存、可复用的结构化资料。' },
    ],
    featureTitle: '像学习记录一样逐张展开',
    featureCopy: '界面截图按学习闭环排列，从首页工作台开始，逐步进入问答、练习、错题、复习和回看。',
    techIntro: '项目的技术重点是把 Vue 页面、FastAPI 路由、数据库对象和 AI 接口组织成一条稳定的学习数据链。',
    techNotes: [
      { label: 'Frontend', title: 'Vue 3 学习工作台', copy: '用路由和页面模块承接不同学习场景，降低工具切换成本。' },
      { label: 'Backend', title: 'FastAPI 按业务拆分', copy: '鉴权、问答、错题、出题、复习、历史和导图分别组织，避免接口混乱。' },
      { label: 'Data', title: '学习记录可沉淀', copy: '错题、复习、历史记录不只服务当前页面，也为后续周报和复习算法留空间。' },
      { label: 'AI', title: 'AI 服务进入流程', copy: '模型能力不是孤立按钮，而是被问答、出题、分析和导图持续调用。' },
    ],
    diagramTitle: '学习闭环与数据链路',
    diagramCopy: '说明图负责解释“为什么不是聊天框”，以及前端、后端、数据库和 AI 接口如何协作。',
    retroLead: '这个项目最适合展示综合能力：产品流程、全栈实现、AI 接入和学习场景理解同时存在。',
  },
  'gesture-particles': {
    themeClass: 'theme-neon-stage',
    kicker: 'Realtime Particle Stage',
    lead: '把摄像头里的手势变成 WebGL 粒子运动，页面本身像一个可被身体动作点亮的实时交互舞台。',
    heroCaption: '表白模式 · 粒子文字与花瓣',
    metrics: [
      { label: '粒子形态', value: 4, note: '爱心、花朵、烟花、表白' },
      { label: '技术节点', value: 4, note: '摄像头到 WebGL' },
      { label: '实时反馈', value: 60, note: '面向 60fps 的视觉响应' },
      { label: '说明图', value: 3, note: '链路、状态、降级' },
    ],
    flowKicker: 'Signal Chain',
    flowTitle: '摄像头到 Three.js 的发光链路',
    flowCopy: '这页不走普通文档感，而是用深色舞台把实时识别、状态计算和粒子渲染做成一条可视化链路。',
    flowSteps: [
      { title: '摄像头', copy: '浏览器获取视频流，并处理权限与降级提示。' },
      { title: '手势识别', copy: 'MediaPipe 读取手部关键点，判断左右手状态。' },
      { title: '状态计算', copy: '根据双手距离、手指数量和模式计算交互参数。' },
      { title: 'Three.js 渲染', copy: '粒子缓动到目标形态，形成聚合、扩散和切换效果。' },
    ],
    featureTitle: '四种粒子场景像舞台灯光一样切换',
    featureCopy: '截图区不做普通图片墙，而是让爱心、花朵、烟花和表白模式保持沉浸式暗色展示。',
    techIntro: '技术重点在实时链路：浏览器多媒体能力、手部关键点识别、状态平滑和 WebGL 粒子渲染需要同时稳定。',
    techNotes: [
      { label: 'Camera', title: '视频流和权限处理', copy: '摄像头是交互入口，必须考虑授权失败和降级提示。' },
      { label: 'MediaPipe', title: '手势关键点识别', copy: '根据关键点数量、位置和距离转成页面可使用的状态。' },
      { label: 'State', title: '状态平滑与模式切换', copy: '通过缓动和目标形态降低手势抖动带来的画面跳变。' },
      { label: 'WebGL', title: 'Three.js 粒子表达', copy: '用大量点位和颜色变化承接视觉冲击力。' },
    ],
    diagramTitle: '实时识别链路',
    diagramCopy: '用发光链路图解释摄像头、手势识别、状态计算和粒子渲染之间的关系。',
    retroLead: '这个项目是作品集中最能体现创意交互和视觉实验的一页，重点不是表单，而是身体动作带来的即时反馈。',
  },
  'pixel-mecha-battle': {
    themeClass: 'theme-arcade-hud',
    kicker: 'Retro Arcade HUD',
    lead: '把小游戏说明页做成一块复古街机启动屏：键盘输入、血条、攻击防御和胜负判定都被放进战斗 HUD。',
    heroCaption: '启动界面 · 双人对战入口',
    metrics: [
      { label: '玩家数量', value: 2, note: '本地双人键盘对战' },
      { label: '核心状态', value: 5, note: '移动、攻击、防御、血量、胜负' },
      { label: '游戏界面', value: 3, note: '开始、战斗、结算' },
      { label: '输入通道', value: 2, note: 'keydown 与 keyup' },
    ],
    flowKicker: 'Game Loop',
    flowTitle: '从按键输入到胜负结算',
    flowCopy: '游戏页要把规则讲清楚：按键只记录状态，循环负责移动、碰撞、血量变化和最终渲染。',
    flowSteps: [
      { title: '键盘输入', copy: 'keydown 和 keyup 记录双人按键状态。' },
      { title: '状态更新', copy: '每帧计算位置、朝向、攻击、防御和冷却。' },
      { title: '战斗判定', copy: '根据距离、朝向和防御状态计算伤害。' },
      { title: '渲染结算', copy: '绘制角色和血条，血量归零后进入胜负页。' },
    ],
    featureTitle: '从开始游戏到战斗结算',
    featureCopy: '截图像游戏关卡一样展开：启动屏建立气氛，对战页拆解规则，结算页完成闭环。',
    techIntro: '技术实现围绕游戏循环展开，输入、状态、碰撞和渲染必须保持清晰边界。',
    techNotes: [
      { label: 'Input', title: '键盘状态表', copy: '按键事件只维护状态，不直接写死每一次移动。' },
      { label: 'Loop', title: '逐帧更新', copy: '游戏循环统一处理位置、攻击、防御、冷却和血量。' },
      { label: 'Combat', title: '碰撞与朝向判定', copy: '攻击是否命中由距离、方向和防御状态共同决定。' },
      { label: 'HUD', title: '血条和胜负反馈', copy: 'HUD 让玩家立即理解当前战斗状态。' },
    ],
    diagramTitle: 'Canvas 循环与战斗规则',
    diagramCopy: '说明图把输入、状态更新、碰撞判定和渲染结算连接起来。',
    retroLead: '这个项目展示的是规则驱动交互能力，适合作为作品集中区别于后台和全栈应用的游戏实验。',
  },
  'library-management-system': {
    themeClass: 'theme-library-console',
    kicker: 'Library Admin Console',
    lead: '用沉稳的馆务后台视角拆解图书管理系统：先看登录氛围，再进入仪表盘、图书、借阅、读者和公告模块。',
    heroCaption: '登录页 · 图书馆阅读空间',
    metrics: [
      { label: '馆务模块', value: 5, note: '仪表盘到公告管理' },
      { label: '业务对象', value: 4, note: '图书、读者、借阅、公告' },
      { label: '后台截图', value: 6, note: '覆盖核心管理页' },
      { label: '说明图', value: 3, note: '模块、流程、数据对象' },
    ],
    flowKicker: 'Admin Modules',
    flowTitle: '馆务状态先被汇总到仪表盘',
    flowCopy: '后台系统的阅读节奏要跟业务模块走：先看总览，再进入图书、借阅、读者和公告。',
    flowSteps: [
      { title: '仪表盘', copy: '汇总馆藏、读者、借阅和逾期指标。' },
      { title: '图书管理', copy: '维护图书信息、分类和库存状态。' },
      { title: '借阅管理', copy: '处理借出、归还和逾期记录。' },
      { title: '读者管理', copy: '维护读者资料和借阅资格。' },
      { title: '公告管理', copy: '发布和维护馆内通知。' },
    ],
    featureTitle: '像控制台一样拆开后台模块',
    featureCopy: '左侧模块目录跟随滚动高亮，右侧按业务模块展示截图，强调后台业务建模和库存联动。',
    techIntro: '技术重点不是华丽视觉，而是业务对象关系、数据总览、表格操作和借阅流程的稳定组织。',
    techNotes: [
      { label: 'Model', title: '业务对象建模', copy: '图书、读者、借阅记录和公告之间存在清晰关联。' },
      { label: 'Dashboard', title: '关键指标汇总', copy: '先让管理员看到馆藏、借阅、逾期等全局状态。' },
      { label: 'Table', title: '表格密度控制', copy: '后台页面需要信息密度，但 hover 和分组要让阅读不乱。' },
      { label: 'Flow', title: '借阅流程联动', copy: '借出、归还、逾期会影响库存和统计状态。' },
    ],
    diagramTitle: '馆务模块和借阅流程',
    diagramCopy: '说明图用来补足后台模块关系、借阅流程和数据对象关联。',
    retroLead: '这个项目强调稳定、清晰、可维护的后台体验，适合展示业务拆解和管理系统组织能力。',
  },
  'xuexi-helper-extension': {
    themeClass: 'theme-extension-panel',
    kicker: 'Chrome Extension Panel',
    lead: '把学习通练习助手做成一个从网页右侧滑出的扩展说明页，重点展示作业模式、章节模式和收起状态。',
    heroCaption: '扩展首页 · 配置面板',
    metrics: [
      { label: '运行状态', value: 3, note: '作业、章节、收起' },
      { label: '安全步骤', value: 4, note: '识别、解析、展示、确认' },
      { label: '扩展脚本', value: 3, note: 'popup、background、content' },
      { label: '真实截图', value: 4, note: '覆盖插件主要状态' },
    ],
    flowKicker: 'Safe Assistant Flow',
    flowTitle: '识别题目，展示解析，保留人工确认',
    flowCopy: '扩展要贴近网页运行，但不能把关键动作藏起来，所以流程设计强调辅助边界。',
    flowSteps: [
      { title: '识别题目', copy: 'content script 从页面 DOM 中提取题目和选项。' },
      { title: 'AI 解析', copy: '把题目交给模型分析，尽量输出可解释结果。' },
      { title: '展示答案', copy: '在浮窗中呈现答案、解析和运行状态。' },
      { title: '人工确认', copy: '保留用户确认动作，不做不可见的自动提交。' },
    ],
    featureTitle: '三种状态贴近网页运行',
    featureCopy: '作业模式、章节模式和收起胶囊会像插件面板一样在页面右侧展开，强调“辅助而非自动提交”。',
    techIntro: '技术实现重点在 Manifest V3 生命周期、content script 隔离环境、DOM 题目提取和 AI 调用安全边界。',
    techNotes: [
      { label: 'MV3', title: '扩展生命周期', copy: 'popup、background service worker 和 content scripts 分工运行。' },
      { label: 'DOM', title: '网页题目识别', copy: '第三方页面结构不稳定，需要防御式 DOM 提取。' },
      { label: 'AI', title: '解析结果展示', copy: '把答案和解析放在浮窗里，让用户能看见依据。' },
      { label: 'Safety', title: '不自动提交', copy: '用人工确认和状态提示保持工具边界清晰。' },
    ],
    diagramTitle: '扩展结构与安全流程',
    diagramCopy: '说明图解释 popup、background、content scripts 和安全辅助流程。',
    retroLead: '这个项目适合展示浏览器扩展、网页自动化适配和 AI 辅助工具的边界意识。',
  },
  'campus-secondhand-market': {
    themeClass: 'theme-campus-route',
    kicker: 'Campus Trade Routes',
    lead: '把校园二手交易平台组织成两条路线：买家从浏览到联系，卖家从登录到发布，最后由后台维护平台数据。',
    heroCaption: '校园首页 · 轮播与分类入口',
    metrics: [
      { label: '交易路径', value: 2, note: '买家路线与卖家路线' },
      { label: '页面节点', value: 6, note: '首页、列表、发布、中心、登录、后台' },
      { label: '路线焦点', value: 4, note: '浏览、发布、个人中心、后台' },
      { label: '后台反差', value: 1, note: '蓝紫渐变区分管理端' },
    ],
    flowKicker: 'Trade Routes',
    flowTitle: '滚动浏览四个校园交易节点',
    flowCopy: '路线模块会随着滚动依次聚焦浏览、发布、个人中心和后台，帮助读者按交易动线理解页面结构。',
    flowSteps: [
      { title: '浏览', copy: '买家从首页和分类入口进入商品列表。' },
      { title: '发布', copy: '卖家填写闲置物品信息并提交。' },
      { title: '个人中心', copy: '管理资料、发布记录和后续交易。' },
      { title: '后台', copy: '管理员查看数据并维护用户与物品。' },
    ],
    featureTitle: '前台交易流程与后台管理能力',
    featureCopy: '用户端保持绿色校园感，后台用蓝紫渐变形成反差，让平台角色一眼能被区分。',
    techIntro: '技术实现强调多页面组织、商品卡片信息结构、发布表单和管理后台的视觉区分。',
    techNotes: [
      { label: 'Buyer', title: '买家浏览路径', copy: '首页、分类、商品列表和详情信息构成浏览路线。' },
      { label: 'Seller', title: '卖家发布路径', copy: '登录、个人中心、发布表单和发布记录构成管理路线。' },
      { label: 'Cards', title: '商品卡片表达', copy: '图片、标题、价格、卖家和时间需要同时清楚可读。' },
      { label: 'Admin', title: '后台维护能力', copy: '管理员端承担用户、物品和平台数据维护。' },
    ],
    diagramTitle: '校园交易路线地图',
    diagramCopy: '说明图补充页面关系、用户交易路径和后台职责分区。',
    retroLead: '这个项目适合展示多页面组织、交易路径表达和前后台视觉差异。',
  },
}

const config = computed(() => (project.value ? caseConfigs[project.value.slug] ?? fallbackConfig : fallbackConfig))

const projectScreenshots = computed(() =>
  project.value?.screenshots?.length
    ? project.value.screenshots
    : project.value
      ? [{ src: project.value.heroImage, title: `${project.value.title} 首页`, caption: project.value.summary, focus: '首页' }]
      : [],
)

const detailParagraphs = computed(() => project.value?.detail.split(/\n\n+/).filter(Boolean) ?? [])
const readmeTitles = ['项目定位', '页面体验', '技术实现', '复盘方向', '作品集整理']

const overviewRows = computed(() => {
  if (!project.value) return []
  return [
    { label: '项目类型', value: project.value.category },
    { label: '开发角色', value: project.value.role },
    { label: '完成时间', value: project.value.date },
    { label: '项目状态', value: project.value.status },
    { label: '截图数量', value: `${projectScreenshots.value.length} 张` },
    { label: '说明图', value: `${project.value.detailImages.length} 张` },
  ]
})

const campusRouteDetails = computed(() => {
  const shots = projectScreenshots.value
  return [
    {
      label: 'Browse',
      title: '先让买家知道从哪里开始',
      copy: '首页、分类入口和商品列表承担第一段路径，读者可以看到平台如何把零散闲置物品组织成可筛选、可比较的商品流。',
      image: shots[1]?.src ?? project.value?.heroImage,
      points: ['轮播图建立校园平台氛围', '分类入口降低浏览成本', '商品卡片承接价格和卖家信息'],
    },
    {
      label: 'Publish',
      title: '卖家用表单把闲置物品放上平台',
      copy: '发布页负责把标题、分类、价格、新旧程度和描述收集完整，让商品信息从一开始就有统一结构。',
      image: shots[2]?.src ?? project.value?.heroImage,
      points: ['字段覆盖商品核心信息', '表单状态和提交动作明确', '为后续个人中心记录做准备'],
    },
    {
      label: 'Profile',
      title: '个人中心承接资料和交易记录',
      copy: '个人中心不是装饰页，它让学生用户能回看自己的发布、预约、留言和基础资料，形成交易后的持续入口。',
      image: shots[3]?.src ?? project.value?.heroImage,
      points: ['资料维护集中在一处', '发布记录可以持续追踪', '后续交易和留言留有空间'],
    },
    {
      label: 'Admin',
      title: '后台把平台数据交给管理员维护',
      copy: '管理员后台用另一套视觉语言呈现数据统计、用户维护和物品管理，和前台绿色校园感形成明确对比。',
      image: shots[4]?.src ?? project.value?.heroImage,
      points: ['管理员入口独立', '统计和表格适合重复管理', '蓝紫色强调后台控制台身份'],
    },
  ]
})

const campusBuyerRoute = [
  { label: '进入首页', copy: '通过轮播图、欢迎语和分类入口建立平台第一印象。' },
  { label: '筛选分类', copy: '在物品列表中按书籍、电子产品、家具等分类缩小范围。' },
  { label: '比较商品', copy: '通过卡片查看图片、标题、描述、价格、卖家和发布时间。' },
  { label: '联系卖家', copy: '商品详情和个人信息为后续沟通、预约和留言预留空间。' },
]

const campusSellerRoute = [
  { label: '登录身份', copy: '学生登录后进入个人交易空间，管理员也有独立入口。' },
  { label: '填写物品', copy: '发布表单覆盖标题、分类、价格、新旧程度和描述。' },
  { label: '管理资料', copy: '个人中心维护学号、联系方式、专业、年级和注册时间。' },
  { label: '回看记录', copy: '侧边栏承接我的发布、预约、留言和设置等后续页面。' },
]

const campusProductCards = computed(() =>
  projectScreenshots.value.slice(1, 5).map((shot, index) => ({
    ...shot,
    price: ['￥36', '￥128', '￥0', 'ADMIN'][index] ?? '校园价',
  })),
)

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateFlow(progress: number) {
  const total = config.value.flowSteps.length
  flowProgress.value = progress
  activeFlowIndex.value = Math.min(total - 1, Math.max(0, Math.floor(progress * total)))
}

const motion = useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, mm, root }) => {
  if (root.classList.contains('project-case-ai-study-helper')) {
    gsap
      .timeline()
      .from('.ai-case-hero-copy > *', {
        autoAlpha: 0,
        y: 30,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(
        '.ai-case-main-shot, .ai-case-overview-card',
        {
          autoAlpha: 0,
          y: 46,
          scale: 0.965,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.38',
      )

    gsap.to('.ai-case-main-shot', {
      y: -14,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    ScrollTrigger.batch(root.querySelectorAll('.ai-case-metrics article'), {
      start: 'top 82%',
      onEnter: (items) => {
        gsap.fromTo(items, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
            const target = Number(counter.dataset.target ?? '0')
            const state = { value: 0 }
            gsap.to(state, {
              value: target,
              duration: 1.1,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            })
          })
        })
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.22, overwrite: true }),
    })

    mm.add('(min-width: 861px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        pin: true,
        start: 'top 112px',
        end: () => `+=${Math.max(980, config.value.flowSteps.length * 280)}`,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    mm.add('(max-width: 860px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        start: 'top 62%',
        end: 'bottom 24%',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    ScrollTrigger.batch(root.querySelectorAll('.ai-record-card, .ai-case-tech-grid article, .ai-case-diagram-grid figure, .ai-case-readme article'), {
      start: 'top 78%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 44, rotate: -0.6, scale: 0.985 },
          { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 0.7, stagger: 0.08, overwrite: true },
        )
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 24, scale: 0.99, duration: 0.24, overwrite: true }),
    })

    return
  }

  if (root.classList.contains('project-case-gesture-particles')) {
    gsap
      .timeline()
      .from('.particle-case-hero-copy > *', {
        autoAlpha: 0,
        y: 38,
        duration: 0.76,
        stagger: 0.09,
        ease: 'power3.out',
      })
      .from(
        '.particle-case-overview',
        {
          autoAlpha: 0,
          x: 42,
          scale: 0.96,
          duration: 0.72,
          ease: 'power3.out',
        },
        '-=0.32',
      )

    gsap.fromTo(
      '.particle-case-hero-bg',
      { scale: 1.1 },
      {
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.particle-case-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      },
    )

    root.querySelectorAll('.particle-scene-card img').forEach((image) => {
      gsap.fromTo(
        image,
        { scale: 0.94 },
        {
          scale: 1.055,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top 86%',
            end: 'bottom 18%',
            scrub: 0.8,
          },
        },
      )
    })

    ScrollTrigger.batch(root.querySelectorAll('.particle-scene-card, .particle-tech-grid article, .particle-diagram-grid figure, .particle-readme article'), {
      start: 'top 78%',
      end: 'bottom 18%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 48, scale: 0.985, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.72, stagger: 0.08, overwrite: true },
        )
      },
      onLeaveBack: (items) => {
        gsap.to(items, { autoAlpha: 0, y: 26, scale: 0.99, filter: 'blur(5px)', duration: 0.26, overwrite: true })
      },
    })

    mm.add('(min-width: 861px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        pin: true,
        start: 'top 112px',
        end: () => `+=${Math.max(900, config.value.flowSteps.length * 320)}`,
        scrub: 0.75,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    mm.add('(max-width: 860px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        start: 'top 62%',
        end: 'bottom 24%',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    return
  }

  if (root.classList.contains('project-case-pixel-mecha-battle')) {
    gsap
      .timeline()
      .from('.mecha-case-hero-copy > *', {
        autoAlpha: 0,
        y: 34,
        duration: 0.68,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(
        '.mecha-case-cabinet',
        {
          autoAlpha: 0,
          y: 42,
          scale: 0.94,
          rotation: -1.2,
          duration: 0.78,
          ease: 'back.out(1.35)',
        },
        '-=0.32',
      )
      .from(
        '.mecha-case-controls span',
        {
          y: -16,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.34,
          ease: 'bounce.out',
        },
        '-=0.22',
      )

    ScrollTrigger.batch(root.querySelectorAll('.mecha-case-hud article'), {
      start: 'top 82%',
      onEnter: (items) => {
        gsap.fromTo(items, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.08, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
            const target = Number(counter.dataset.target ?? '0')
            const state = { value: 0 }
            gsap.to(state, {
              value: target,
              duration: 0.9,
              ease: 'steps(12)',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            })
          })
          item.querySelectorAll<HTMLElement>('i').forEach((bar) => {
            gsap.to(bar, {
              width: bar.style.getPropertyValue('--bar-target') || '74%',
              duration: 0.9,
              ease: 'power2.out',
              overwrite: true,
            })
          })
        })
      },
      onLeaveBack: (items) => {
        gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.22, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('i').forEach((bar) => gsap.set(bar, { width: '0%' }))
        })
      },
    })

    ScrollTrigger.batch(root.querySelectorAll('.mecha-shot-card, .mecha-rule-panels article, .mecha-tech-grid article, .mecha-diagram-grid figure, .mecha-readme article'), {
      start: 'top 78%',
      end: 'bottom 18%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 42, scale: 0.96, filter: 'contrast(1.8) saturate(0.35)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'contrast(1) saturate(1)', duration: 0.62, stagger: 0.08, overwrite: true },
        )
      },
      onLeaveBack: (items) => {
        gsap.to(items, { autoAlpha: 0, y: 24, scale: 0.98, filter: 'contrast(1.6) saturate(0.45)', duration: 0.24, overwrite: true })
      },
    })

    gsap.to('.mecha-case-cabinet', {
      y: -10,
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    mm.add('(min-width: 861px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        pin: true,
        start: 'top 112px',
        end: () => `+=${Math.max(860, config.value.flowSteps.length * 300)}`,
        scrub: 0.72,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    mm.add('(max-width: 860px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        start: 'top 62%',
        end: 'bottom 24%',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    return
  }

  if (root.classList.contains('project-case-library-management-system')) {
    gsap
      .timeline()
      .from('.library-case-hero-copy > *', {
        autoAlpha: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(
        '.library-case-login-card',
        {
          autoAlpha: 0,
          y: 36,
          scale: 0.96,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.3',
      )

    gsap.fromTo(
      '.library-case-hero-bg',
      { scale: 1.08 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.library-case-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      },
    )

    ScrollTrigger.batch(root.querySelectorAll('.library-case-metrics article'), {
      start: 'top 82%',
      onEnter: (items) => {
        gsap.fromTo(items, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
            const target = Number(counter.dataset.target ?? '0')
            const state = { value: 0 }
            gsap.to(state, {
              value: target,
              duration: 1,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            })
          })
        })
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.22, overwrite: true }),
    })

    root.querySelectorAll<HTMLElement>('.library-module-section').forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 58%',
        end: 'bottom 42%',
        onEnter: () => updateFlow(index / Math.max(1, config.value.flowSteps.length - 1)),
        onEnterBack: () => updateFlow(index / Math.max(1, config.value.flowSteps.length - 1)),
      })
    })

    root.querySelectorAll<SVGPathElement>('.library-trend-path').forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: path.closest('.library-trend-card'),
          start: 'top 82%',
          end: 'bottom 38%',
          scrub: 0.8,
        },
      })
    })

    ScrollTrigger.batch(
      root.querySelectorAll('.library-module-section, .library-tech-grid article, .library-diagram-grid figure, .library-readme article'),
      {
        start: 'top 78%',
        end: 'bottom 18%',
        onEnter: (items) => {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 42, scale: 0.985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.66, stagger: 0.07, overwrite: true },
          )
        },
        onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 24, scale: 0.99, duration: 0.24, overwrite: true }),
      },
    )

    return
  }

  if (root.classList.contains('project-case-xuexi-helper-extension')) {
    gsap
      .timeline()
      .from('.extension-case-hero-copy > *', {
        autoAlpha: 0,
        y: 32,
        duration: 0.68,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(
        '.extension-browser-stage',
        {
          autoAlpha: 0,
          y: 34,
          scale: 0.96,
          duration: 0.68,
          ease: 'power3.out',
        },
        '-=0.3',
      )
      .from(
        '.extension-floating-panel',
        {
          autoAlpha: 0,
          x: 120,
          scale: 0.96,
          duration: 0.78,
          ease: 'power3.out',
        },
        '-=0.24',
      )
      .from(
        '.extension-capsule',
        {
          autoAlpha: 0,
          x: 80,
          scale: 0.82,
          duration: 0.42,
          ease: 'back.out(1.5)',
        },
        '-=0.2',
      )

    ScrollTrigger.batch(root.querySelectorAll('.extension-case-metrics article'), {
      start: 'top 82%',
      onEnter: (items) => {
        gsap.fromTo(items, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
            const target = Number(counter.dataset.target ?? '0')
            const state = { value: 0 }
            gsap.to(state, {
              value: target,
              duration: 0.95,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            })
          })
        })
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.22, overwrite: true }),
    })

    ScrollTrigger.batch(root.querySelectorAll('.extension-state-card'), {
      start: 'top 78%',
      end: 'bottom 20%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, x: 56, scale: 0.96 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.68, stagger: 0.12, overwrite: true, ease: 'power3.out' },
        )
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, x: 34, scale: 0.98, duration: 0.24, overwrite: true }),
    })

    mm.add('(min-width: 861px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        pin: true,
        start: 'top 112px',
        end: () => `+=${Math.max(820, config.value.flowSteps.length * 300)}`,
        scrub: 0.72,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    mm.add('(max-width: 860px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        start: 'top 62%',
        end: 'bottom 24%',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    ScrollTrigger.batch(root.querySelectorAll('.extension-tech-grid article, .extension-diagram-grid figure, .extension-readme article'), {
      start: 'top 78%',
      end: 'bottom 18%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 40, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.64, stagger: 0.07, overwrite: true },
        )
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 24, scale: 0.99, duration: 0.24, overwrite: true }),
    })

    return
  }

  if (root.classList.contains('project-case-campus-secondhand-market')) {
    gsap
      .timeline()
      .from('.campus-hero-copy > *', {
        autoAlpha: 0,
        y: 34,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
      })
      .from(
        '.campus-hero-shot',
        {
          autoAlpha: 0,
          y: 46,
          scale: 0.965,
          duration: 0.82,
          ease: 'power3.out',
        },
        '-=0.34',
      )

    gsap.fromTo(
      '.campus-hero-shot img',
      { scale: 1.03 },
      {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.campus-case-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    )

    ScrollTrigger.batch(root.querySelectorAll('.campus-case-metrics article'), {
      start: 'top 82%',
      onEnter: (items) => {
        gsap.fromTo(items, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.07, overwrite: true })
        items.forEach((item) => {
          item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
            const target = Number(counter.dataset.target ?? '0')
            const state = { value: 0 }
            gsap.to(state, {
              value: target,
              duration: 1,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = String(Math.round(state.value))
              },
            })
          })
        })
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.22, overwrite: true }),
    })

    mm.add('(min-width: 861px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        pin: true,
        start: 'top 104px',
        end: () => `+=${Math.max(1040, config.value.flowSteps.length * 340)}`,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    mm.add('(max-width: 860px)', () => {
      if (!flowRef.value) return undefined
      ScrollTrigger.create({
        trigger: flowRef.value,
        start: 'top 72%',
        end: 'bottom 18%',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateFlow(self.progress),
        onLeave: () => updateFlow(1),
        onLeaveBack: () => updateFlow(0),
      })
      return undefined
    })

    ScrollTrigger.batch(root.querySelectorAll('.campus-product-card'), {
      start: 'top 78%',
      end: 'bottom 18%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 42, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.66, stagger: 0.09, overwrite: true },
        )
        gsap.fromTo(
          items.map((item) => item.querySelector('.campus-price-tag')).filter(Boolean),
          { autoAlpha: 0, y: 14, scale: 0.72 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, stagger: 0.08, ease: 'back.out(1.8)', overwrite: true },
        )
      },
      onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 24, scale: 0.99, duration: 0.24, overwrite: true }),
    })

    ScrollTrigger.batch(
      root.querySelectorAll('.campus-case-table, .campus-path-grid article, .campus-admin-copy, .campus-admin-shot, .campus-tech-grid article, .campus-diagram-grid figure, .campus-readme article'),
      {
        start: 'top 78%',
        end: 'bottom 18%',
        onEnter: (items) => {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 40, scale: 0.986 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.64, stagger: 0.07, overwrite: true },
          )
        },
        onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 22, scale: 0.99, duration: 0.24, overwrite: true }),
      },
    )

    return
  }

  const heroTimeline = gsap.timeline()
  heroTimeline
    .from('.project-case-hero-copy > *', {
      autoAlpha: 0,
      y: 30,
      duration: 0.78,
      stagger: 0.08,
      ease: 'power3.out',
    })
    .from(
      '.project-case-device, .ai-hero-snapshot',
      {
        autoAlpha: 0,
        y: 42,
        rotate: -1.5,
        scale: 0.96,
        duration: 0.82,
        ease: 'power3.out',
      },
      '-=0.46',
    )

  ScrollTrigger.batch(root.querySelectorAll('.project-case-table, .project-case-metric'), {
    start: 'top 82%',
    onEnter: (items) => {
      gsap.fromTo(items, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.07, overwrite: true })
      items.forEach((item) => {
        item.querySelectorAll<HTMLElement>('.js-count').forEach((counter) => {
          const target = Number(counter.dataset.target ?? '0')
          const state = { value: 0 }
          gsap.to(state, {
            value: target,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = String(Math.round(state.value))
            },
          })
        })
      })
    },
    onLeaveBack: (items) => gsap.to(items, { autoAlpha: 0, y: 18, duration: 0.24, overwrite: true }),
  })

  mm.add('(min-width: 861px)', () => {
    if (!flowRef.value) return undefined
    ScrollTrigger.create({
      trigger: flowRef.value,
      pin: true,
      start: 'top 112px',
      end: () => `+=${Math.max(760, config.value.flowSteps.length * 310)}`,
      scrub: 0.75,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateFlow(self.progress),
      onLeave: () => updateFlow(1),
      onLeaveBack: () => updateFlow(0),
    })
    return undefined
  })

  mm.add('(max-width: 860px)', () => {
    if (!flowRef.value) return undefined
    ScrollTrigger.create({
      trigger: flowRef.value,
      start: 'top 64%',
      end: 'bottom 26%',
      scrub: 0.55,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateFlow(self.progress),
      onLeaveBack: () => updateFlow(0),
    })
    return undefined
  })

  ScrollTrigger.batch(
    root.querySelectorAll('.project-case-shot, .project-case-tech-cards article, .project-case-diagram, .project-case-readme article'),
    {
      start: 'top 78%',
      end: 'bottom 18%',
      onEnter: (items) => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 42, scale: 0.985, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.08, overwrite: true },
        )
      },
      onLeaveBack: (items) => {
        gsap.to(items, { autoAlpha: 0, y: 26, scale: 0.99, filter: 'blur(5px)', duration: 0.26, overwrite: true })
      },
    },
  )

  gsap.to('.project-case-device', {
    y: -14,
    duration: 2.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  ScrollTrigger.create({
    trigger: root.querySelector('.project-case-feature-section'),
    start: 'top 76%',
    onEnter: () => root.classList.add('case-features-in-view'),
    onLeaveBack: () => root.classList.remove('case-features-in-view'),
  })
})

watch(
  () => route.params.slug,
  () => {
    activeFlowIndex.value = 0
    flowProgress.value = 0
    void motion.refreshMotion()
  },
)
</script>
