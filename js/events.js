
window.addEventListener("scroll", _ => {
    const nav = document.getElementById('mainNav')
    
    if (window.scrollY >= 50) {
        nav.classList.add('bg-light')
        nav.attributes.getNamedItem('data-bs-theme').value = ''
    } else {
        nav.classList.remove('bg-light')
        nav.attributes.getNamedItem('data-bs-theme').value = 'dark'
    }

});