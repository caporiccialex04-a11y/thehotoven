import './style.css'

const header = document.querySelector('[data-header]')
const parallaxImg = document.querySelector('[data-parallax]')
const revealEls = document.querySelectorAll('[data-reveal]')

function onScroll() {
  const y = window.scrollY
  if (header) {
    header.classList.toggle('is-scrolled', y > 40)
  }
  if (parallaxImg) {
    const offset = Math.min(y * 0.22, 120)
    parallaxImg.style.transform = `scale(1.08) translate3d(0, ${offset}px, 0)`
  }
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  )
  revealEls.forEach((el) => io.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'))
}

// Hero content should reveal on load
requestAnimationFrame(() => {
  document.querySelectorAll('.hero [data-reveal]').forEach((el) => {
    el.classList.add('is-visible')
  })
})
