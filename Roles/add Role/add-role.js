document.addEventListener("DOMContentLoaded", function () {
    let employeeSelect=document.getElementsByClassName('select-selected')[0];
    employeeSelect.addEventListener( 'click', showEmployeeDropdown);
    function showEmployeeDropdown(){
        let employeeList=document.getElementsByClassName('select-items')[0];
        if(!employeeList.classList.contains("hide"))
            employeeList.classList.add('hide');
        else
            employeeList.classList.remove('hide');
    }
    employeeSelect.addEventListener('input',searchEmployee);
    loadEmployees();
    const addRoleForm = document.getElementById('roleForm');
    addRoleForm.addEventListener("submit", handleRoleSubmit);
    // let roles=employeeDetails('rolesDetail');
    // console.log(roles);
});

function searchEmployee(){
    let input=document.getElementsByClassName("select-selected")[0].value;
    input = input.split(' ').join('').toLowerCase();
   
    let employeeList=document.querySelectorAll('.select-items>li');
    for (let i = 0; i < employeeList.length; i++) {
        
        let name = employeeList[i].textContent.split(" ").join("").toLowerCase().trim();
        if (!name.includes(input)) {
            employeeList[i].style.display="none";
        } else {
            employeeList[i].style.display="";
        }
    }
}

function loadEmployees(){
    let employees=employeeDetails('employeesTableDetail');
    let employeeSelect=document.getElementsByClassName('select-items')[0]
    for(let i=0;i<employees.length;i++){
        list=document.createElement('li');
        list.classList.add('flex');
        imageDiv=document.createElement('div');
        imageDiv.classList.add('assign-employee-profile-option');
        image=document.createElement('img');
        image.src="/images/admin-search.png";
        imageDiv.appendChild(image);
        nameP=document.createElement( 'p' );
        text=employees[i].name;
        nameP.textContent=text;
        checkbox=document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id',employees[i].empNo);
        checkbox.value=employees[i].name;
        imageDiv.appendChild(nameP);
        list.appendChild(imageDiv);
        list.appendChild(checkbox);
        employeeSelect.appendChild(list);
    }
}


