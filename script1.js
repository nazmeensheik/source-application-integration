// Static front-end demo: sample data is kept in this file so no installation is needed.
const internships = [
  {id:1,title:"Java Developer Intern",company:"Tech Solutions",domain:"Java",location:"Hyderabad",duration:"3 months",description:"Practice Java and object-oriented programming."},
  {id:2,title:"Python Developer Intern",company:"CodeWorks",domain:"Python",location:"Remote",duration:"3 months",description:"Build small Python applications."},
  {id:3,title:"AI & ML Intern",company:"AI Technologies",domain:"AI & ML",location:"Hyderabad",duration:"4 months",description:"Explore machine learning with sample datasets."},
  {id:4,title:"Web Development Intern",company:"Digital World",domain:"Web Development",location:"Remote",duration:"2 months",description:"Create responsive websites using HTML, CSS and JavaScript."},
  {id:5,title:"Data Science Intern",company:"Data Insights",domain:"Data Science",location:"Bengaluru",duration:"3 months",description:"Explore data analysis and visualisation."},
  {id:6,title:"Frontend Developer Intern",company:"Web Innovations",domain:"Web Development",location:"Hyderabad",duration:"6 months",description:"Build accessible user interfaces."},
  {id:7,title:"Java Backend Intern",company:"Software Labs",domain:"Java",location:"Remote",duration:"4 months",description:"Learn backend development and Java application design."},
  {id:8,title:"Machine Learning Intern",company:"Future AI",domain:"AI & ML",location:"Remote",duration:"6 months",description:"Explore machine learning algorithms."}
];
const $ = id => document.getElementById(id);
const list=$("internshipList"), searchInput=$("searchInput"), domainFilter=$("domainFilter");
let page=1, pageSize=6, filtered=[];
function message(el,text){el.textContent=text;el.hidden=false}
function hide(el){el.hidden=true;el.textContent=""}
function createCard(item){
  const card=document.createElement("article");card.className="card";
  const title=document.createElement("h3");title.textContent=item.title;
  const company=document.createElement("p");company.className="company";company.textContent=item.company;
  const desc=document.createElement("p");desc.className="description";desc.textContent=item.description;
  const meta=document.createElement("p");meta.className="meta";meta.textContent=`${item.domain} · ${item.location} · ${item.duration}`;
  const button=document.createElement("button");button.type="button";button.className="button";button.textContent="Apply for this";
  button.addEventListener("click",()=>{$("internshipChoice").value=String(item.id);$("apply-heading").scrollIntoView({behavior:"smooth"});$("fullName").focus({preventScroll:true})});
  card.append(title,company,desc,meta,button);return card;
}
function render(){
  const q=searchInput.value.trim().toLowerCase(), domain=domainFilter.value;
  filtered=internships.filter(x=>(!q||[x.title,x.company,x.domain].some(v=>v.toLowerCase().includes(q)))&&(domain==="all"||x.domain===domain));
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(page,pages);
  list.replaceChildren();filtered.slice((page-1)*pageSize,page*pageSize).forEach(x=>list.appendChild(createCard(x)));
  $("resultCount").textContent=`${filtered.length} internship${filtered.length===1?"":"s"} found`;
  $("pageInfo").textContent=`Page ${page} of ${pages}`;$("previousButton").disabled=page<=1;$("nextButton").disabled=page>=pages;
  $("emptyMessage").hidden=filtered.length!==0;hide($("errorMessage"));hide($("loadingMessage"));
}
function fillChoices(){internships.forEach(x=>{const o=document.createElement("option");o.value=String(x.id);o.textContent=`${x.title} — ${x.company}`;$("internshipChoice").appendChild(o)})}
$("filterForm").addEventListener("submit",e=>{e.preventDefault();page=1;render()});
searchInput.addEventListener("input",()=>{page=1;render()});domainFilter.addEventListener("change",()=>{page=1;render()});
$("clearButton").addEventListener("click",()=>{searchInput.value="";domainFilter.value="all";page=1;render();searchInput.focus()});
$("previousButton").addEventListener("click",()=>{if(page>1){page--;render()}});
$("nextButton").addEventListener("click",()=>{if(page<Math.ceil(filtered.length/pageSize)){page++;render()}});
$("applicationForm").addEventListener("submit",e=>{
  e.preventDefault();hide($("formMessage"));
  const name=$("fullName").value.trim(),email=$("email").value.trim(),choice=$("internshipChoice").value,msg=$("message").value.trim();
  if(name.length<2||name.length>60||!/^[A-Za-z .'-]+$/.test(name)){message($("formMessage"),"Please enter a valid name using 2–60 letters.");$("fullName").focus();return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>120){message($("formMessage"),"Please enter a valid email address.");$("email").focus();return}
  if(!internships.some(x=>String(x.id)===choice)){message($("formMessage"),"Please select an internship.");$("internshipChoice").focus();return}
  if(msg.length>500){message($("formMessage"),"Your message must be 500 characters or fewer.");return}
  // Static-only demo: do not claim data was sent to a server.
  message($("formMessage"),"Your form passed browser validation. This static demo does not send or save applications. A backend is required for real secure submission.");
  $("applicationForm").reset();
});
fillChoices();render();
