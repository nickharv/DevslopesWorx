const fancyBody = document.querySelector(".fancy-body");

if (fancyBody) {
  const profileImage = document.getElementById("candidate-image");
  const profileName = document.getElementById("candidate-name");
  const bioHeader = document.getElementById("about-me");
  const profileRole = document.getElementById("candidate-desired-role");
  const profileBio = document.querySelector(".candidate-bio");
  const skillsHeader = document.getElementById("skills");
  const skillsList = document.getElementById("skills-list");
  const hobbiesHeader = document.getElementById("hobbies");
  const hobbiesList = document.getElementById("hobbies-list");
  const contactsHeader = document.getElementById("contacts");
  const contactsTable = document.querySelector(".contacts-table");

  const nameArr = profileName.innerText.split(" ");
  console.log(nameArr);

  const profileFirstName = document.createElement("span");
  profileFirstName.setAttribute("class", "first-name");
  profileFirstName.innerHTML = nameArr[0];

  const profileLastName = document.createElement("span");
  profileLastName.setAttribute("class", "last-name");
  profileLastName.innerText = nameArr[1];

  profileName.innerHTML = "";
  profileName.append(profileFirstName);
  profileName.append(profileLastName);

  const headerContainer = document.createElement("div");
  headerContainer.setAttribute("class", "header-container");
  headerContainer.append(profileName);
  headerContainer.append(profileRole);

  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("class", "main-container");

  const bioContainer = document.createElement("div");
  bioContainer.setAttribute("class", "bio-container");
  const headerWrapper = document.createElement("span");
  headerWrapper.innerText = bioHeader.innerText;
  bioHeader.innerText = "";
  bioHeader.append(headerWrapper);
  bioContainer.append(bioHeader);
  bioContainer.append(profileBio);

  const skillsContainer = document.createElement("div");
  skillsContainer.setAttribute("class", "skills-container");
  const skillsWrapper = document.createElement("span");
  skillsWrapper.innerText = skillsHeader.innerText;
  skillsHeader.innerText = "";
  skillsHeader.append(skillsWrapper);
  skillsContainer.append(skillsHeader);
  skillsContainer.append(skillsList);

  const hobbiesContainer = document.createElement("div");
  hobbiesContainer.setAttribute("class", "hobbies-container");
  const hobbiesWrapper = document.createElement("span");
  hobbiesWrapper.innerText = hobbiesHeader.innerText;
  hobbiesHeader.innerText = "";
  hobbiesHeader.append(hobbiesWrapper);
  hobbiesContainer.append(hobbiesHeader);
  hobbiesContainer.append(hobbiesList);

  const contactsContainer = document.createElement("div");
  contactsContainer.setAttribute("class", "contacts-container");
  contactsContainer.append(contactsHeader);
  contactsContainer.append(contactsTable);

  const darkPart = document.createElement("div");
  darkPart.setAttribute("class", "dark-part");
  darkPart.append(profileImage);
  darkPart.append(contactsHeader);
  darkPart.append(contactsTable);

  const lightPart = document.createElement("div");
  lightPart.setAttribute("class", "light-part");
  lightPart.append(headerContainer);
  lightPart.append(bioContainer);
  lightPart.append(skillsContainer);
  lightPart.append(hobbiesContainer);

  fancyBody.insertBefore(mainContainer, fancyBody.firstChild);
  mainContainer.append(darkPart);
  mainContainer.append(lightPart);
}
