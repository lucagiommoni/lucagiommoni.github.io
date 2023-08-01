const contentUrls = [
  "contents/intro.md",
  "contents/academic.md",
  "contents/workExp.md"
]

document.getElementById("currentYear").innerText = new Date().getUTCFullYear();

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

function enforceHyperLink(html) {
  const links = html.getElementsByTagName('a')
  if (links.length !== 0) {
    Array.from(links).forEach(e => {
      e.setAttribute('target', '_blank')
      e.setAttribute('rel', 'nofollow noopener noreferrer')
    })
  }
}

function createNodeFromJson(jsonData) {
  buildCompaniesElement(jsonData.companies);
  buildSkillsElement(jsonData.certifications);
  // buildSkillsElement(jsonData.certifications.sort((a, b) => (new Date(b.date) - new Date(a.date))));
}

function buildCompaniesElement(companies) {
  // console.log(companies);
  let el = document.getElementById("gridOfCompanies");
  companies.forEach(
    (e) =>
    (el.innerHTML += `
    <div class="col-12 col-md-3 text-center">
      <a href="${e.src}" target="_blank" rel="nofollow noopener noreferrer">
        <img src="${e.img}" alt="${e.name}" style="width: 15em" />
      </a>
    </div>`)
  );
}

function buildSkillsElement(certs) {
  let skills = []
  certs.forEach(e => { skills = [...skills, ...e.skills] })
  skills = skills.filter((e, i) => skills.indexOf(e) === i)
  console.log(skills);
  const parentDiv = document.getElementById("skillsGrid");
  skills.forEach(skill => {
    parentDiv.innerHTML += `<div class="px-2"><div class="w-100 badge bg-light text-secondary py-3">${skill}</div></div>`
  })
  //   certs.forEach(
  //     (e) =>
  //     (el.innerHTML += `
  //     <div class="col-lg-4 col-sm-6" style="border: 4px solid transparent;">
  //       <a class="portfolio-box" href="${e.source}" style="background-image: url(${e.source});">
  //       <div class="portfolio-box-caption">
  //       <div class="project-name">${e.name}</div>
  //       <div class="project-category text-white-50">${e.date}</div>
  //     </div>
  //   </a>
  // </div>`)
  //   );
}

fetch("data.json")
  .then((response) => response.json())
  .then((json) => createNodeFromJson(json));

const calls = contentUrls.map(url => fetch(url).then((res) => res.text()))

Promise.all(calls)
  .then(results => fillinSection(results))
  .finally(_ => document.getElementById("yow").innerHTML = (new Date().getFullYear() - 2016))