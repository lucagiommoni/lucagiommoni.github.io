document.getElementById("currentYear").textContent =
  new Date().getUTCFullYear();

function createNodeFromJson(jsonData) {
  createComp(jsonData.companies);
  createCerts(jsonData.certs.sort((a, b) => { return (new Date(b.date) - new Date(a.date)) }));
}

function createComp(companies) {
  console.log(companies);
  let el = document.getElementById("gridOfCompanies");
  companies.forEach(
    (e) =>
    (el.innerHTML += `<div class="col-12 col-md-3 text-center">
            <a href="${e.src}" target="_blank">
              <img
                src="${e.img}"
                alt="${e.name}"
                style="width: 15em"
              />
            </a>
          </div>`)
  );
}

function createCerts(certs) {
  let el = document.getElementById("gridOfCertifications");
  certs.forEach(
    (e) =>
    (el.innerHTML += `<div class="col-lg-4 col-sm-6" style="border: 4px solid transparent;">
  <a
    class="portfolio-box"
    href="${e.source}"
    style="background-image: url(${e.source});"
  >
    <div class="portfolio-box-caption">
      <div class="project-name">
        ${e.name}
      </div>
      <div class="project-category text-white-50">
        ${e.date}
      </div>
    </div>
  </a>
</div>`)
  );
}

fetch("data.json")
  .then((response) => response.json())
  .then((json) => createNodeFromJson(json));

// Creating the intro section
fetch("intro.md")
  .then((res) => res.text())
  .then((txt) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(txt);
    document.getElementById("aboutText").innerHTML = html;
  });

// Creating the academic section
fetch("academic.md")
  .then((res) => res.text())
  .then((txt) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(txt);
    document.getElementById("academicText").innerHTML = html;
  });

// Creating the work experience section
fetch("workExp.md")
  .then((res) => res.text())
  .then((txt) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(txt);
    document.getElementById("workingExperience").innerHTML = html;
  });


