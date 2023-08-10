document.getElementById("currentYear").innerText = new Date().getUTCFullYear();

/*******************************************************************/

const contentUrls = [
  "contents/intro.md",
  "contents/academic.md",
  "contents/workExp.md"
]

const calls = contentUrls.map(url => fetch(url).then((res) => res.text()))

Promise.all(calls)
  .then(results => fillinSection(results))
  .finally(_ => document.getElementById("yow").innerHTML = (new Date().getFullYear() - 2016))

function fillinSection(txt) {
  if (typeof txt === "object" && Array.isArray(txt)) {
    txt.forEach(e => fillinSection(e))
  } else {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(txt);
    const el = document.querySelector('#about>div')
    el.innerHTML += `${html}`
    enforceHyperLink(el)
  }
}

/*******************************************************************/

fetch("data.json")
  .then((response) => response.json())
  .then((json) => createNodeFromJson(json));

function createNodeFromJson(jsonData) {

  // Build Companies

  const gridOfCompanies = document.getElementById("gridOfCompanies");
  jsonData.companies.forEach(e => {
    gridOfCompanies.innerHTML += `
<div class="col-12 col-md-3 text-center">
  <a href="${e.src}" target="_blank" rel="nofollow noopener noreferrer">
    <img src="${e.img}" alt="${e.name}" style="width: 15em" />
  </a>
</div>`
  })

  // Build Certifications Carousel

  const carousel = document.querySelector('#certImgCarousel_01 .carousel-inner')
  jsonData.certifications.forEach((e, i) => {
    const active = i === 0 ? 'active' : ''
    carousel.innerHTML += `
<div class="carousel-item ${active}">
  <img src="${e.source}" class="d-block w-100" alt="${e.name}">
</div>
`
  })

  // Build Socials

  const socials = Array.from(document.getElementsByClassName('socials'))
  jsonData.socials.filter(e => e.enabled).forEach((e, i) => {
    const active = i === 0 ? 'active' : ''
    socials.forEach(s => {
      s.innerHTML += `
<a href="${e.link}" class="text-reset text-decoration-none m-3"
  target="_blank" rel="nofollow noopener noreferrer">
  <i class="${e.class}"></i>
</a>
`
    })
  })
}

function enforceHyperLink(html) {
  const links = html.getElementsByTagName('a')
  if (links.length !== 0) {
    Array.from(links).forEach(e => {
      e.setAttribute('target', '_blank')
      e.setAttribute('rel', 'nofollow noopener noreferrer')
    })
  }
}

