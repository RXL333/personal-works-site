<template>
  <footer class="app-footer glass-pill">
    <span>© 2026 Ren Xiaolin</span>
    <div class="footer-links" aria-label="联系入口">
      <button type="button" aria-label="复制 GitHub 链接" title="复制 GitHub 链接" @click="openContact('github')">
        <span aria-hidden="true">⌘</span>
        <small>GitHub</small>
      </button>
      <button type="button" aria-label="复制邮箱地址" title="复制邮箱地址" @click="openContact('email')">
        <span aria-hidden="true">✉</span>
        <small>邮箱</small>
      </button>
      <RouterLink to="/about" aria-label="打开关于页面" title="关于我">
        <span aria-hidden="true">♣</span>
        <small>关于</small>
      </RouterLink>
    </div>
  </footer>

  <div v-if="contactMode" class="contact-backdrop" @click.self="contactMode = null">
    <section class="contact-modal glass-panel" role="dialog" aria-modal="true" :aria-label="modalTitle">
      <button type="button" class="contact-close" aria-label="关闭弹窗" @click="contactMode = null">×</button>
      <p class="eyebrow">Contact</p>
      <h2>{{ modalTitle }}</h2>
      <p>{{ modalValue }}</p>
      <button type="button" class="contact-copy" @click="copyContact">
        {{ copyButtonText }}
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

type ContactMode = 'github' | 'email'

const contactMode = ref<ContactMode | null>(null)
const hasCopied = ref(false)

const modalTitle = computed(() => (contactMode.value === 'github' ? 'GitHub 主页' : '邮箱地址'))
const modalValue = computed(() =>
  contactMode.value === 'github' ? 'https://github.com/RXL333' : '2654799110@qq.com',
)
const copyButtonText = computed(() =>
  hasCopied.value ? '已复制' : contactMode.value === 'github' ? '复制 GitHub 链接' : '复制邮箱地址',
)

function openContact(mode: ContactMode) {
  contactMode.value = mode
  hasCopied.value = false
}

async function copyContact() {
  try {
    await navigator.clipboard.writeText(modalValue.value)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = modalValue.value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
  hasCopied.value = true
}
</script>
