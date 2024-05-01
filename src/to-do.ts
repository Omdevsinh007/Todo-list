const task = document.getElementById("addTask") as HTMLInputElement;
const detail = document.getElementById("addTaskDetail") as HTMLInputElement;
const addData = document.getElementById("addData") as HTMLInputElement;
const form = document.getElementById("addDataForm") as HTMLFormElement; 
const updateData = document.getElementById("updateData") as HTMLInputElement;
const addDataForm = document.getElementById("addDataForm") as HTMLFormElement;
const updateDataForm = document.getElementById("updateDataForm") as HTMLFormElement;
const themebutton = document.getElementById("themeButton") as HTMLButtonElement;
const userName = document.getElementById("userName") as HTMLHeadingElement;
const logoutUser = document.getElementById("logoutUser") as HTMLButtonElement;
const userTasks: UserTask[] = JSON.parse(localStorage.getItem("UserTask") || "[]");
const userN = '';
const uName = '';
const main = document.getElementById("main") as HTMLDivElement;
const updateTask = document.getElementById("updateTask") as HTMLInputElement;
const updateTaskDetail = document.getElementById("updateTaskDetail") as HTMLInputElement;
const loader = document.getElementById("loader") as HTMLDivElement;
const loaderMain = document.getElementById("loader") as HTMLDivElement;
const WebTheme: string = localStorage.getItem("WebTheme") || "Light";
const body = document.getElementById("body") as HTMLBodyElement;
const search = document.getElementById('search') as HTMLInputElement;

userName.textContent = `Welcome ${uName}!`;
updateDataForm.style.display = "none";

//Logout function
logoutUser.addEventListener("click", (): void => {
  localStorage.removeItem("LoginUser");
  location.href = "../html/login.html";
});

//Create a interface for UserTasks
interface UserTask {
  userName: string;
  taskName: string;
  taskDetail: string;
  color: string;
}

//Creating random color
function random(): string {
  let someColor: string = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.4)`;
  return someColor;
}

//Adding task
addData.addEventListener("click", (): void => {
  let taskName: string = task.value.trim();
  let taskDetails: string = detail.value.trim();
  if(taskName != '' && taskDetails != '') {
    let color = random();
  let addTask: UserTask = {
    userName: uName,
    taskName: taskName,
    taskDetail: taskDetails,
    color: color,
  };
  userTasks.push(addTask);
  localStorage.setItem("UserTask", JSON.stringify(userTasks));
  // displayTask(uName);
  loadingDisplay();
  task.value = "";
  detail.value = "";
  } else {
    if(taskName == '' && taskDetails == '') {
      alert('What are you even adding?');
    } else if(taskName == '') {
      alert("I am sure tasks have a name don't you?")
    } else {
      alert('Task Detail Where?')
    }
  }
});

//Displaying the Task
function displayTask(name: string): void {
  main.innerHTML = "";
  if (userTasks.length == 0) {
    main.innerHTML += "<h3 class='msg'>No tasks to do in current moment.</h3>";
  } else {
    userTasks.map((ele, index) => {
      if (ele.userName === name) {
        let display = `
                <div id='div${index}' class='inner' style='background-color: ${ele.color}'>
                <div class='h'><h3>${ele.taskName}</h3><input type='checkbox' id='check${index}' onclick='remove(${index})'></div><hr>
                <div id='p'>
                <p>${ele.taskDetail}</p>
                </div>
                <div class='btn'>
                <button id='update' onclick='update(${index})'>Update</button>
                <button id='delete' onclick='remove(${index})'>Delete</button>
                </div>
                </div>
                `;
        main.innerHTML += display;
        index++;
      }
    });
  }
  loader.style.display = "none";
  loaderMain.style.display = "none";
}

//Showing tasks with loader
function loadingDisplay(): void {
  main.innerHTML = "";
  body.style.display = 'block';
  loader.style.display = 'block';
  setTimeout(()=>{
    displayTask(uName);
  },500)
}

//Shows loader when loaded the page
function load(): void {
  body.style.display = 'none';
  setTimeout(loadingDisplay,500)
}
load()

//To remove the tasks or delete the tasks
function remove(i: number): void {
  userTasks.splice(i, 1);
  localStorage.setItem("UserTask", JSON.stringify(userTasks));
  // displayTask(uName);
  loadingDisplay();
}

//To update the tasks
function update(i: number): void {
  if(updateTask.value == '' && updateTaskDetail.value == '') {
    let arr = [];
  arr.push(i);
  addDataForm.style.display = "none";
  updateDataForm.style.display = "block";
  let targetDiv = document.querySelector(`#div${i}`) as HTMLDivElement;
  targetDiv.style.display = "none";
  updateTask.value = userTasks[i].taskName;
  updateTaskDetail.value = userTasks[i].taskDetail;
  updateData.addEventListener("click", () => {
    if(updateTask.value.trim() != '' && updateTaskDetail.value.trim() !='') {
      userTasks[arr[0]].taskName = updateTask.value;
    userTasks[arr[0]].taskDetail = updateTaskDetail.value;
    localStorage.setItem("UserTask", JSON.stringify(userTasks));
    arr.pop();
    targetDiv.style.display = "block";
    updateTask.value = "";
    updateTaskDetail.value = "";
    addDataForm.style.display = "block";
    updateDataForm.style.display = "none";
    // displayTask(uName);
    loadingDisplay();
    } else {
      if(updateTask.value.trim() == '' && updateTaskDetail.value.trim() =='') {
        alert('What are you even updating?')
      } else if(updateTask.value.trim() == '') {
        alert("I am sure tasks have a name don't you?")
      } else {
        alert('No details huh 🤨');
      }
    }
  });
  } else {
    alert('Somthing went wrong! try updating the current form first.');
  }
}

//To change the Theme of the website
themebutton.addEventListener("click", () => {
  const audio = new Audio("data:audio/mpeg;base64,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l66A+sBKsb3MK//SnKSoeEbwjlksu4Y6nUw8//swZPsA8awMWfghSAAAAA0gAAABCB0LYeAwQ4gAADSAAAAElUxBTUUzLjEwMFVVVVVVVVVVVVVVgRCAAnmjmEjpMKT//f6oUrbOjqnbawppb6P//2DCQVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//swZPuA8etCV/kBHWAAAA0gAAABBxBTXeA8YoAAADSAAAAEVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sgZPyA8agY1vgLEKAAAA0gAAABBxDdV+KkToAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7IGT0gPF8JNV4BxHQAAANIAAAAQUcZVOgCSfAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk9wzxTDJTaCASMgAADSAAAAEDIJ9QQAh2gAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTtjfDOL1IYARUQAAANIAAAAQC4ATIAAAAAAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAf4AAAAgAAA0gAAABAAAB/gAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
  audio.play();
  
  if (navigator.vibrate) navigator.vibrate(50);
  if(themebutton.textContent === 'Light') {
    themebutton.textContent = 'Dark';
    document.body.classList.add('dark_theme');
    localStorage.setItem('WebTheme', 'Dark');
  } else {
    themebutton.textContent = 'Light';
    document.body.classList.remove('dark_theme');
    localStorage.setItem('WebTheme', 'Light');
  }
});

//For searching the task
search.addEventListener('keyup', (): void => {
  const searchValue = search.value;
  main.innerHTML = '';
  loader.style.display = 'block';
  setTimeout(()=>{
    main.innerHTML = '';
    let arr: string[] = [];
  userTasks.forEach((ele, index) => {
    if (ele.userName === uName && ele.taskName.toLowerCase().includes(searchValue.toLowerCase())) {
      let display = `
        <div id='div${index}' class='inner' style='background-color: ${ele.color}'>
          <div class='h'><h3>${ele.taskName}</h3><input type='checkbox' id='check${index}' onclick='remove(${index})'></div><hr>
          <div id='p'>
            <p>${ele.taskDetail}</p>
          </div>
          <div class='btn'>
            <button id='update' onclick='update(${index})' title='Update the task'>Update</button>
            <button id='delete' onclick='remove(${index})' title='delete the task'>Delete</button>
          </div>
        </div>
      `;
      main.innerHTML += display;
      arr.push(ele.taskName);
    }
  });
  if (arr.length === 0) {
    main.innerHTML = '<h3 class="msg">No such tasks at this moment</h3>';
  }
  loader.style.display = 'none';
  },500);
});

//To show the last changed theme
if(WebTheme === 'Light') {
  themebutton.textContent = 'Light';
  document.body.classList.remove('dark_theme');
} else {
  themebutton.textContent = 'Dark';
  document.body.classList.add('dark_theme');
}