// Progressive enhancement tingz
document.documentElement.classList.remove('no-js')

// Add scroll animations
function callback(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-visible')
  })
}

const observer = new IntersectionObserver(callback)

const targets = document.querySelectorAll('.show-on-scroll')
targets.forEach((target) => {
  observer.observe(target)
})
