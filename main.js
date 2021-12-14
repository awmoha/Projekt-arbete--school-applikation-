let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

//skapa function för studentData
let setHTML = (obj) => {
  return `<p> <strong>Namn:</strong> ${obj.firstName}  ${obj.lastName}  
          <br> <strong> Ålder:</strong> ${obj.age} 
          <br> <strong> Hobbies:</strong> ${obj.hobbies}
          <br> <strong>programme: </strong>${obj.programme}</p>`;
};
//skapa function för studentData2
let setHTML2 = (obj2) => {
  return ` <p> <strong>Namn:</strong> ${obj2.lastName} ${obj2.firstName}    
          <br> <strong>Ålder:</strong> ${obj2.age} 
          <br> <strong>Hobbies:</strong> ${obj2.hobbies}
          <br> <strong>programme:</strong> ${obj2.programme}</p>`;
};
//skapa en tom array för att pusha skolor till det
let skolRender = [];
function removeToRender() {
  while (skolRender.length != 0) {
    skolRender.pop();
  }
}
//skapa function för RenderData
const RenderDataSkol = () => {
  let list = document.querySelector("#list");
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
  //if-satsat för att sortera i rangordning
  if (
    skolRender.filter(
      (e) =>
        e.priority === "high" || e.priority === "medium" || e.priority === "low"
    ).length > 0
  ) {
    skolRender.sort((a, b) => {
      if (
        a.priority === "high" &&
        (b.priority === "medium" || b.priority === "low")
      ) {
        return -1;
      } else if (a.priority === "medium" && b.priority === "low") {
        return -1;
      } else if (a.priority === "low" && b.priority === "medium") {
        return 1;
      } else {
        return 0;
      }
    });
  }
  for (let i = 0; i < skolRender.length; i++) {
    let newList = document.createElement("li");
    newList.innerHTML = skolRender[i].text;
    newList.style.color = skolRender[i].color;
    console.log(newList);
    list.appendChild(newList);
  }
};

async function renderData() {
  //länkar till data
  let studentData = await getData("https://api.mocki.io/v2/01047e91/students");
  let schoolData = await getData("https://api.mocki.io/v2/01047e91/schools");
  //första input funktion att söka via namn osv
  let search = document.createElement("input");
  search.type = "text";
  search.placeholder = "Search by, name, age, programme and hobbies";
  let searchbtn = document.createElement("button");
  searchbtn.textContent = "Search";
  document.querySelector("#input").append(search, searchbtn);
  studentData.forEach((student) => {
    searchbtn.addEventListener("click", () => {
      let info = document.createElement("p");

      for (let i = 0; i < student.hobbies.length; i++) {
        if (
          search.value.toLowerCase() === student.firstName.toLowerCase() ||
          search.value.toLowerCase() === student.lastName.toLowerCase() ||
          search.value === student.age ||
          search.value === student.programme ||
          search.value === student.hobbies[i]
        ) {
          info.innerHTML = setHTML(student);
        }
      }
      document.querySelector("#info").appendChild(info);
    });
  });

  //kod för att lista ut eleverna och en knapp föt samtliga skolor
  studentData.forEach((student) => {
    let li1 = document.createElement("p");
    li1.setAttribute("id", "li1");
    li1.innerHTML = `<div> <strong>Student namn:</strong> <br>${student.firstName} 
     ${student.lastName} </div>`;
    document.querySelector("#ListOfUtbild").appendChild(li1);
    //  let schoolBtn = document.createElement("button");
    // schoolBtn.textContent = "School info";
    //  li1.appendChild(schoolBtn);
    //kod för att skriva ut skolor som passar eleverna bäst
    li1.addEventListener("click", () => {
      document.querySelector("#listOfAll").innerHTML = "";
      document.querySelector("#listOffilter").innerHTML = "";
      document.querySelector("#fallande").innerHTML = "";
      document.querySelector("#fallandeName").innerHTML = "";
      document.querySelector("#fallandeLastName").innerHTML = "";
      removeToRender();
      schoolData.forEach((skola) => {
        let newLiSkol = {};
        let studentHobbies = student.hobbies;
        let schoolActivities = skola.activities;
        if (
          skola.programmes.includes(student.programme) &&
          studentHobbies.every((element) => schoolActivities.includes(element))
        ) {
          newLiSkol.color = "green";
          newLiSkol.text = skola.name;
          newLiSkol.priority = "high";
          skolRender.push(newLiSkol);
        } else if (skola.programmes.includes(student.programme)) {
          newLiSkol.color = "yellow";
          newLiSkol.text = skola.name;
          newLiSkol.priority = "medium";
          skolRender.push(newLiSkol);
        } else {
          newLiSkol.color = "red";
          newLiSkol.text = skola.name;
          newLiSkol.priority = "low";
          skolRender.push(newLiSkol);
        }
      });
      RenderDataSkol(); //kör RenderData function
    });
  });

  //kod för filtera by utbildning
  let utbildningData = document.querySelector("#utbildning");
  let filterButton = document.querySelector("#filter");
  studentData.forEach((student) => {
    filterButton.addEventListener("click", () => {
      //tomma alla andra data när vi klicka på knappen
      document.querySelector("#listOfAll").innerHTML = "";
      document.querySelector("#fallande").innerHTML = "";
      document.querySelector("#fallandeName").innerHTML = "";
      document.querySelector("#fallandeLastName").innerHTML = "";
      list.innerHTML="";
      let li = document.createElement("ul");
      if (student.programme === utbildningData.value) {
        li.innerHTML = setHTML(student);
        document.querySelector("#listOffilter").appendChild(li);
      }
    });
  });
  //kod för räckna från first age
  let ageButton = document.querySelector("#filterByAge");
  let studentsData = studentData;
  ageButton.addEventListener("click", () => {
    //tomma alla andra data när vi klicka på knappen
    document.querySelector("#listOffilter").innerHTML = "";
    document.querySelector("#fallande").innerHTML = "";
    document.querySelector("#listOfAll").innerHTML = "";
    document.querySelector("#fallandeName").innerHTML = "";
    document.querySelector("#fallandeLastName").innerHTML = "";

    let fallande = document.createElement("button");
    fallande.textContent = "Filtera by age highest to lowest";
    document.querySelector("#fallande").appendChild(fallande);
    studentsData.sort(function (a, b) {
      return a.age - b.age;
    });
    for (let i = 0; i < studentsData.length; i++) {
      let li1 = document.createElement("ul");
      li1.innerHTML = setHTML(studentsData[i]);
      document.querySelector("#listOfAll").appendChild(li1);
    }
    //räkna tvärtom age button
    fallande.addEventListener("click", () => {
      document.querySelector("#listOfAll").innerHTML = "";
      studentsData.sort(function (a, b) {
        return b.age - a.age;
      });
      for (let i = 0; i < studentsData.length; i++) {
        let list0 = document.createElement("ul");
        list0.innerHTML = setHTML(studentsData[i]);
        document.querySelector("#listOfAll").appendChild(list0);
      }
    });
  });
  //kod för first name
  let firstNameButton = document.querySelector("#filterByFirstName");
  firstNameButton.addEventListener("click", () => {
    //tomma alla andra data när vi klicka på knappen
    document.querySelector("#listOffilter").innerHTML = "";
    document.querySelector("#fallande").innerHTML = "";
    document.querySelector("#fallandeName").innerHTML = "";
    document.querySelector("#listOfAll").innerHTML = "";
    document.querySelector("#fallandeLastName").innerHTML = "";

    let fallandeName = document.createElement("button");
    fallandeName.textContent = "Filtera first name from Z-A";
    document.querySelector("#fallandeName").appendChild(fallandeName);
    let studentsData = studentData;
    studentsData.sort(function (a, b) {
      return a.firstName.localeCompare(b.firstName);
    });
    for (let i = 0; i < studentsData.length; i++) {
      let li2 = document.createElement("ul");
      li2.innerHTML = setHTML(studentsData[i]);
      document.querySelector("#listOfAll").appendChild(li2);
    }
    //sortera tvärtom first name
    fallandeName.addEventListener("click", () => {
      document.querySelector("#listOfAll").innerHTML = "";
      studentsData.sort(function (a, b) {
        return b.firstName.localeCompare(a.firstName);
      });
      for (let i = 0; i < studentsData.length; i++) {
        let list001 = document.createElement("ul");
        list001.innerHTML = setHTML(studentsData[i]);
        document.querySelector("#listOfAll").appendChild(list001);
      }
    });
  });
  //kod för last name
  let lastNameButton = document.querySelector("#filterByLastName");
  lastNameButton.addEventListener("click", () => {
    document.querySelector("#listOffilter").innerHTML = "";
    document.querySelector("#fallande").innerHTML = "";
    document.querySelector("#fallandeName").innerHTML = "";
    document.querySelector("#fallandeLastName").innerHTML = "";
    document.querySelector("#listOfAll").innerHTML = "";

    let fallandeLastName = document.createElement("button");
    fallandeLastName.textContent = "Filter last name from A-Z";
    document.querySelector("#fallandeLastName").appendChild(fallandeLastName);
    let studentsData = studentData;
    studentsData.sort(function (a, b) {
      return a.lastName.localeCompare(b.lastName);
    });
    for (let i = 0; i < studentsData.length; i++) {
      let li3 = document.createElement("ul");
      li3.innerHTML = setHTML2(studentsData[i]);
      document.querySelector("#listOfAll").appendChild(li3);
    }
    //kod för sortera tvärtom
    fallandeLastName.addEventListener("click", () => {
      document.querySelector("#listOfAll").innerHTML = "";
      document.querySelector("#fallandeName").innerHTML = "";
      studentsData.sort(function (a, b) {
        return b.lastName.localeCompare(a.lastName);
      });
      for (let i = 0; i < studentsData.length; i++) {
        let list002 = document.createElement("ul");
        list002.innerHTML = setHTML2(studentsData[i]);
        document.querySelector("#listOfAll").appendChild(list002);
      }
    });
  });
}
//kod för dark-light-mode
const mode = document.getElementById("mode");
mode.addEventListener("click", (e) => {
  // document.body.classList.toggle("dark");
  if (mode.checked === true) {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "");
  }
});
renderData();
