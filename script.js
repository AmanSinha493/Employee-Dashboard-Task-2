let isCollapsed = false;
let statusTopbar = false;

function saveToSessionStorage(employee) {
    let savedEmployees = JSON.parse(sessionStorage.getItem("employeesTableDetail")) || [];
    savedEmployees.push(employee);
    sessionStorage.setItem("employeesTableDetail", JSON.stringify(savedEmployees));
}
function searchBar() {
    let input = document.querySelector(".search-input input").value.split(' ').join('').toLowerCase();
    let table = document.querySelector(".employee-table tbody");
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let name = row.cells[1].textContent.split(" ").join("").toLowerCase().trim();
        if (!name.startsWith(input)) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    }
}

function sideBar() {
    const icon = document.querySelector(".collapse-btn");
    const mainBody = document.getElementById("main-body");
    const sideBar = document.querySelector('.side-bar');
    const collapsedSideBar = document.querySelector('.side-bar-collapsed');
    if (!isCollapsed) {
        collapsedSideBar.classList.remove('hide');
        sideBar.classList.add('hide');
        mainBody.style.gridTemplateColumns = "1fr 15fr";
        icon.style.transform = "rotate(180deg)";
        icon.style.marginLeft = "1%";
    }
    else {
        mainBody.style.gridTemplateColumns = "1fr 5fr";
        icon.style.transform = "rotate(0deg)";
        collapsedSideBar.classList.add('hide');
        sideBar.classList.remove('hide');
        icon.style.marginLeft = "0%";
    }
    isCollapsed = !isCollapsed;
}

function toggleStatus() {
    const statusText = this.textContent.toUpperCase();
    const isActive = statusText === 'ACTIVE';
    const newText = isActive ? 'Inactive' : 'Active';
    this.textContent = newText;
    this.classList.toggle('btn-active', !isActive);
    this.classList.toggle('btn-inactive', isActive);
}

function addRow(employee) {
    const employeeTableBody = document.querySelector('tbody');
    let tr = `
        <tr>
            <td class="check-box-col"><input type="checkbox" class="select"></td>
            <td class="list-profile flex edit-col">
                <img src="${employee.img}" alt="profile">
                <div>
                    <div class="list-profile-name">${employee.name}</div>
                    <div class="list-profile-mail grey-color">${employee.email}</div>
                </div>
            </td>
            <td class="col col-location edit-col">${employee.location}</td>
            <td class="col col-department edit-col">${employee.dept}</td>
            <td class="col-role col edit-col">${employee.role}</td>
            <td class="col-emp-no col edit-col">${employee.empNo}</td>
            <td class="col-status col">
                <div class="">${employee.status}</div>
            </td>
            <td class="col-join-dt col edit-col">${employee.joinDate}</td>
            <td class="three-dots col">
                <i class="fa-solid fa-ellipsis"></i>
                <div class="ellipsis-menu hide-ellipsis-menu flex-column">
                    <div class="child details">More Details</div>
                    <div class="child edit">Edit</div>
                    <div class="child delete">Delete</div>
                </div>
            </td>
        </tr>`;
    employeeTableBody.innerHTML += tr;
}
function addEventsOnRows() {
    const checkboxes = document.querySelectorAll('.select');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', activateDeleteButton);
    });
    const more = document.querySelectorAll(".three-dots .fa-ellipsis");
    more.forEach((ellipsis) => {
        ellipsis.addEventListener('click', toggleEditOption);
    });
    const edit = document.querySelectorAll(".child.edit, .child.details,.edit-col");
    edit.forEach((row) => {
        row.addEventListener('click', editEmployeeForm);
    });
    const deleteButtons = document.querySelectorAll('.child.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', ellipsisDelete);
    });
    const status = document.querySelectorAll(".col-status div");
    status.forEach((elem) => {
        elem.addEventListener('click', toggleStatus);
        if (elem.textContent.toUpperCase() != 'ACTIVE') {
            elem.className = 'btn-inactive';
        }
        else {
            elem.className = 'btn-active';
        }
    });
}

function toggleEditOption(event) {
    let threeDots = event.target;
    let allEllipsisMenu = threeDots.parentElement.querySelector(`.ellipsis-menu`);
    allEllipsisMenu.classList.toggle('hide-ellipsis-menu');
    document.addEventListener('click', (event) => {
        if (!allEllipsisMenu.contains(event.target) && event.target !== threeDots) {
            allEllipsisMenu.style.display = 'none';
        } else {
            allEllipsisMenu.style.display = '';
        }
    });
}

function ellipsisDelete() {
    this.parentNode.parentNode.parentNode.querySelector('.check-box-col input').checked = true;
    openDeleteConfirmation();
}

function activateDeleteButton() {
    let deleteBtn = document.querySelector(".delete-btn");
    let checkBoxes = document.querySelectorAll('.check-box-col input');
    let isAnyChecked = checkBoxes => checkBoxes.some(checkbox => checkbox.checked);
    let result = isAnyChecked(Array.from(checkBoxes));
    deleteBtn.disabled = !result;
}

function unpopulateTable() {
    document.querySelector('tbody').innerHTML = '';
}

function populateFilteredTable(filteredEmployees) {
    unpopulateTable();
    sessionStorage.setItem('FilteredEmployeesDetail', JSON.stringify(filteredEmployees));
    const employees = JSON.parse(sessionStorage.getItem('FilteredEmployeesDetail')) || [];
    if (employees && employees.length > 0) {
        employees.forEach(employee => {
            addRow(employee);
        });
    } else {
        console.log('No employee data available.');
    }
    addEventsOnRows();
}
function setAlphabeticFilter() {
    let aplhabets = document.querySelector('.a-to-z-filter').querySelectorAll('div:not(:first-child)');
    aplhabets.forEach(function (child) {
        child.onclick = function () {
            applyAlphabeticFilter(this);
        };
    });
}
function applyAlphabeticFilter(event) {
    var allAlphabets = document.querySelector('.a-to-z-filter').querySelectorAll('div:not(:first-child)');
    var filterIcon = document.getElementById('filter-icon');
    let filteredEmployees = [];
    if (event.classList.contains('selected')) {
        allAlphabets.forEach(x => x.classList.remove('selected'));
        var filterIcon = document.getElementById('filter-icon');
        filterIcon.classList.remove('selected');
        resetFilterStorage();
        populateTable();
        return;
    }
    let input = event.textContent;
    let rows = employeeDetails('employeesTableDetail');
    let profileName;
    for (i = 0; i < rows.length; i++) {
        profileName = rows[i].name.trim().toUpperCase();

        if (profileName[0].toUpperCase() == input) {
            filteredEmployees.push(rows[i]);
        }
    }
    console.log(filterIcon);
    allAlphabets.forEach(x => x.classList.remove('selected'));
    event.classList.add('selected');
    filterIcon.classList.add('selected');
    populateFilteredTable(filteredEmployees);
}
function employeeDetails(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
function resetFilterStorage() {
    employee = employeeDetails('employeesTableDetail')
    sessionStorage.setItem('FilteredEmployeesDetail', JSON.stringify(employee));
}
function populateTable() {
    const employees = JSON.parse(sessionStorage.getItem('employeesTableDetail'));
    if (employees && employees.length > 0) {
        employees.forEach(employee => {
            addRow(employee);
        });
    } else {
        console.log('No employee data available.');
    }
    addEventsOnRows();
}
function selectFilter(event) {
    let checkbox = this.querySelector('input');
    const element = event.target;
    if (element == checkbox)
    return;
    if (checkbox.checked)
    checkbox.checked = false;
    else
    checkbox.checked = true;
}

function toggleFilter(filterId) {
    const filter = document.querySelector(`#${filterId}-filter .${filterId}-dropdown`);
    filter.classList.toggle('hide');
}
function displayStatusFilter() {
    toggleFilter('status');
}

function displayLocationFilter() {
    toggleFilter('location');
}

function displayDepartmentFilter() {
    toggleFilter('department');
}

function checkFilter(employee, filterType) {
    const filterElement = document.getElementById(`${filterType}-filter`);
    const filterInputs = filterElement.querySelectorAll("input");
    const selectedFilters = [];
    filterInputs.forEach(input => {
        if (input.checked) {
            const filterText = input.parentElement.textContent.toLowerCase().split(' ').join('');
            selectedFilters.push(filterText);
        }
    });
    if (selectedFilters.length === 0) {
        return true;
    }
    const employeeFilter = employee.toLowerCase().split(' ').join('');
    return selectedFilters.includes(employeeFilter);
}

function checkStatusFilter(employee) {
    return checkFilter(employee, 'status');
}

function checkLocationFilter(employee) {
    return checkFilter(employee, 'location');
}

function checkDepartmentFilter(employee) {
    return checkFilter(employee, 'department');
}

function applyFilter() {
    let filteredEmployees = [];
    let status, location, department;
    let rows = employeeDetails('employeesTableDetail');
    for (var i = 1; i < rows.length; i++) {
        status = checkStatusFilter(rows[i].status);
        location = checkLocationFilter(rows[i].location);
        department = checkDepartmentFilter(rows[i].dept);
        if (status && location && department) {
            filteredEmployees.push(rows[i]);
        }
    }
    populateFilteredTable(filteredEmployees);
}

function resetFilter() {
    document.querySelector("#status-filter .status-dropdown").classList.add('hide');
    document.querySelector("#department-filter .department-dropdown").classList.add('hide');
    document.querySelector("#location-filter .location-dropdown").classList.add('hide');
    let input = document.querySelectorAll('.filter-options-container input');
    input.forEach((element) => { element.checked = false });
    var allAlphabets = document.querySelector('.a-to-z-filter').querySelectorAll('div:not(:first-child)');
    allAlphabets.forEach(x => { x.classList.remove('selected') });
    var filterIcon = document.getElementById('filter-icon');
    filterIcon.classList.remove('selected');
    unpopulateTable()
    populateTable();
    checkdisableFilterButton();
}

function selectAllRow() {
    var checkbox = document.querySelectorAll('.check-box-col input');
    var isChecked = checkbox[0].checked;
    for (var i = 1; i < checkbox.length; i++) {
        checkbox[i].checked = isChecked;
    }
    activateDeleteButton();
}

function deleteFromSessionStorage(employee) {
    let savedEmployees = JSON.parse(sessionStorage.getItem("employeesTableDetail")) || [];
    selectedEmployee = employee.querySelector('.col-emp-no').textContent;
    savedEmployees = savedEmployees.filter((savedEmployee) => savedEmployee.empNo != selectedEmployee);
    sessionStorage.setItem("employeesTableDetail", JSON.stringify(savedEmployees));
}

function openDeleteConfirmation() {
    document.querySelector('.delete-confirmation').classList.add('show-delete-confirmation');
}
function closeDeleteConfirmation() {
    document.querySelector('.delete-confirmation').classList.remove('show-delete-confirmation');
}
function deleteRow() {
    var rows = document.querySelectorAll('#employee-table tr');
    var checkbox = document.querySelectorAll('.check-box-col input');
    for (var i = 1; i < rows.length; i++) {
        if (checkbox[i].checked) {
            deleteFromSessionStorage(rows[i]);
        }
    }
    closeDeleteConfirmation();
    unpopulateTable();
    populateTable();
}

function tableToCSV() {
    let employees = employeeDetails('FilteredEmployeesDetail');
    let csvContent = arrayToCSV(employees);
    downloadCSVFile(csvContent);
}

function arrayToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let headers = Object.keys(array[0]).filter(header => (header !== "img" && header !== "mobile"));
    let str = '"NAME","EMAIL","LOCATION","DEPARTMENT","ROLE","EMPLOYEE NO","STATUS","JOIN-DATE"\r\n';
    return array.reduce((str, next) => {
        str += `${headers.map(header => `"${next[header]}"`).join(",")}\r\n`;
        return str;
    }, str);
}

function downloadCSVFile(csv_data) {
    CSVFile = new Blob([csv_data], { type: "text/csv" });
    let temp_link = document.createElement('a');
    temp_link.download = "employeeTable.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}

function sortEmployeeTable() {
    let tableHeaders = document.querySelectorAll('#employee-table th');
    for (let i = 1; i < tableHeaders.length - 1; i++) {
        tableHeaders[i].addEventListener("click", sortColumn.bind(this, tableHeaders[i]));
    }
}
let asc = false;
function sortColumn(column) {
    let employees = employeeDetails('employeesTableDetail');
    let value = column.textContent.trim().split(" ").join("").toLowerCase();
    let columnName = ""
    switch (value) {
        case "user": columnName = "name";
            break;
        case "location": columnName = "location";
            break;
        case "department": columnName = "dept";
            break;
        case "role": columnName = "role";
            break;
        case "empno": columnName = "empNo";
            break;
        case "joindt": columnName = "joinDate";
            break;
        case "status": columnName = "status";
    }
    sortArrayByKey(employees, columnName);
    sessionStorage.setItem("employeesTableDetail", JSON.stringify(employees));
    unpopulateTable();
    populateTable();
    asc = !asc;
}

function sortArrayByKey(arr, key) {
    return arr.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        if (!asc) {
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
        }
        else {
            if (x > y) {
                return -1;
            }
            if (x < y) {
                return 1;
            }
        }
        return 0;
    });
}

function displayImagePreview(event) {
    let image = document.getElementById("profileImageInput").files[0];
    if (image) {
        var url = URL.createObjectURL(image);
        document.querySelector('#profileImagePreview').src = url;
    }
}
function showValidInput(element, message) {
    element.style.outlineColor = "red";
    let parentDiv = element.parentElement;
    let span = parentDiv.querySelector('span');
    if (span) {
        span.innerHTML = message;
        span.style.color = "red";
    }
}

function checkValidation(event) {
    event.preventDefault();
    const editflag = document.querySelector('#submitButton').textContent.toLowerCase().split(' ').join('') !== "addemployee";
    const employees = employeeDetails('employeesTableDetail');
    const form = document.getElementById("employeeForm");
    const formInput = form.querySelectorAll('input:not([name="dob"])');
    const formSelect = form.querySelectorAll('select');
    let flag = true;
    for (const element of formInput) {
        switch (element.name) {
            case 'empNo':
                if (!editflag) {
                    if (element.value === "") {
                        showValidInput(element, `&#9888; This is a required field`);
                        flag = false;
                    } else if (employees.some(emp => emp.empNo === element.value)) {
                        showValidInput(element, `&#9888; Employee ID already exists!`);
                        flag = false;
                    } else {
                        showValidInput(element, ``);
                    }
                }
                break;
            case 'mobileNumber':
                if (element.value === "") {
                    showValidInput(element, `&#9888; This is a required field`);
                    flag = false;
                } else if (element.value.toString().length !== 10) {
                    showValidInput(element, `&#9888; Enter a valid number`);
                    flag = false;
                } else {
                    showValidInput(element, ``);
                }
                break;
            case 'firstName':
            case 'lastName':
                if (element.value === "") {
                    showValidInput(element, `&#9888; This is a required field`);
                    flag = false;
                } else if (!/^[A-Za-z]+$/.test(element.value)) {
                    showValidInput(element, `&#9888; Only alphabets are allowed`);
                    flag = false;
                } else {
                    showValidInput(element, ``);
                }
                break;
            case 'email':
                if (element.value === "") {
                    showValidInput(element, `&#9888; This is a required field`);
                    flag = false;
                } else if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(element.value)) {
                    showValidInput(element, `&#9888; Invalid Email Address`);
                    flag = false;
                } else {
                    showValidInput(element, ``);
                }
                break;
            case 'joiningDate':
                const currentDate = new Date();
                const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const currentDateFormatted = `${currentDate.getFullYear()}${currentMonth}${currentDate.getDate()}`;
                const inputDate = element.value.split('-').join('');
                if (element.value === "") {
                    showValidInput(element, `&#9888; This is a required field`);
                    flag = false;
                } else if (parseInt(inputDate) > parseInt(currentDateFormatted)) {
                    showValidInput(element, `&#9888; Invalid date`);
                    flag = false;
                } else {
                    showValidInput(element, ``);
                }
                break;
            default:
                break;
        }
    }
    for (const element of formSelect) {
        if (element.value === '') {
            showValidInput(element, `&#9888; This is a required field`);
            flag = false;
        } else {
            showValidInput(element, ``);
        }
    }
    if (!flag) return;
    if (editflag) {
        updateEmployee(document.getElementById('empNo').value);
    } else {
        handleFormSubmit(event);
    }
    unpopulateTable();
    populateTable();
}

function updateEmployee(id) {
    const employees = employeeDetails('employeesTableDetail');
    let employee = employees.find(emp => emp.empNo == id);
    if (!employee) return;
    const form = document.getElementById("employeeForm");
    const formData = new FormData(form);
    const { firstName, lastName, email, joiningDate, location, jobTitle, department } = Object.fromEntries(formData);
    employee.email = email;
    employee.location = location;
    employee.role = jobTitle;
    employee.dept = department;
    employee.name = `${firstName} ${lastName}`;
    employee.joinDate = joiningDate.split('-').reverse().join('/');
    const profileImageFile = formData.get("profileImage");
    if (profileImageFile.name !== '') {
        const reader = new FileReader();
        reader.readAsDataURL(profileImageFile);
        reader.onload = function () {
            employee.img = reader.result;
            sessionStorage.setItem('employeesTableDetail', JSON.stringify(employees));
        }
    }
    sessionStorage.setItem('employeesTableDetail', JSON.stringify(employees));
    closeAddEmployeeModal();
}

function handleFormSubmit(event) {
    const form = document.getElementById("employeeForm");
    const formData = new FormData(form);
    const empNo = formData.get("empNo");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const joiningDate = formData.get("joiningDate").split('-').reverse().join('/');
    const location = formData.get("location");
    const jobTitle = formData.get("jobTitle");
    const department = formData.get("department");
    const profileImageFile = formData.get("profileImage");
    const name = `${firstName} ${lastName}`;

    let newEmployeeDetails = {
        "dept": department,
        "email": email,
        "empNo": empNo,
        "img": "",
        "joinDate": joiningDate,
        "location": location,
        "name": name,
        "role": jobTitle,
        "status": "Active"
    };
    if (profileImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(profileImageFile);
        reader.onload = function () {
            newEmployeeDetails.img = reader.result;
            saveToSessionStorage(newEmployeeDetails);
        };
    } else {
        saveToSessionStorage(newEmployeeDetails);
    }

    form.reset();
    alert("Employee data has been stored !");
    closeAddEmployeeModal();
}

function editEmployeeForm() {
    openAddEmployeeModal();
    const employees = employeeDetails('employeesTableDetail');
    let employee
    if (this.textContent.toLowerCase() == 'view') {
        console.log("entered")
        currentRow = this.parentNode.querySelector('.employee-info-container>:first-child').textContent.trim();
        employee = employees.filter((employee) => employee.empNo == currentRow)[0];
    }
    else {
        const currentRow = this.closest('tr');
        const empNo = currentRow.querySelector('.col-emp-no').textContent.trim();
        employee = employees.find(emp => emp.empNo == empNo);
    }
    if (!employee) return;
    const nameParts = employee.name.split(' ');
    const selectedEmpJoinDate = employee.joinDate.split('/').reverse().join('-');
    document.getElementById('empNo').value = employee.empNo;
    document.getElementById('empNo').disabled = true;
    document.getElementById('firstName').value = nameParts[0];
    document.getElementById('lastName').value = nameParts.slice(1).join(' ');
    document.getElementById('email').value = employee.email;
    document.getElementById('joiningDate').value = selectedEmpJoinDate;
    document.getElementById('mobileNumber').value = Number(employee.mobile);
    document.getElementById('location').value = employee.location;
    document.getElementById('jobTitle').value = employee.role;
    document.getElementById('department').value = employee.dept;
    document.getElementById('profileImagePreview').src = employee.img;
    const submitButton = document.querySelector('#submitButton');
    if (this.textContent.toLowerCase() != "edit") {
        submitButton.style.display = "none";
        document.querySelector('#cancel').textContent = "Close";
        const inputs = document.querySelectorAll('#employeeForm input, #employeeForm select');
        inputs.forEach(input => input.disabled = true);
        document.querySelector('.upload-profile-pic-btn').style.display = 'none';
    } else {
        submitButton.textContent = "Apply Changes";
    }
}
function openAddEmployeeModal() {
    var AddEmployeeModal = document.getElementsByClassName('add-employee-form')[0]
    AddEmployeeModal.classList.add('show-addEmployee-form');
    document.addEventListener('click', (event) => {
        if (event.target.contains(AddEmployeeModal)) {
            closeAddEmployeeModal();
        }
        else {
            AddEmployeeModal.style.display = '';
        }
    })
}

function closeAddEmployeeModal() {
    const form = document.getElementById("employeeForm");
    form.reset();
    [...form.querySelectorAll('input'), ...form.querySelectorAll('select')].forEach(element => {
        showValidInput(element, "");
        element.disabled = false;
    });
    document.getElementById('profileImagePreview').src = "/images/add-employee-default-user.svg";
    document.querySelector('#submitButton').style.display = "";
    document.querySelector('#submitButton').textContent = "Add Employee";
    document.querySelector('#cancel').textContent = "Cancel";
    document.getElementsByClassName('upload-profile-pic-btn')[0].style.display = '';
    document.getElementsByClassName('upload-profile-pic-btn')[0].disabled = false;
    document.getElementsByClassName('add-employee-form')[0].classList.remove('show-addEmployee-form');
}

function disableFilterButton() {
    let input = document.querySelectorAll('.filter-options-container');
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('click', checkdisableFilterButton);
    }
}
function checkdisableFilterButton() {
    let input = document.querySelectorAll('.filter-options-container input');
    let applyButton = document.querySelector('.apply-btn');
    let resetButton = document.querySelector('.reset-btn');
    let count = Array.from(input).filter(input => input.checked).length;
    applyButton.classList.toggle('active', count > 0);
    resetButton.classList.toggle('active', count > 0);
}

function createRoleBlock(role) {
    let roleBlockContainer = document.getElementsByClassName('role-block-container')[0];
    let roleBlock = document.createElement('div');
    roleBlock.classList.add("role-block", "flex-column");
    roleBlock.innerHTML = `
    <div class="role-heading flex">
        <div class="role-name">${role[0]}</div>
        <div class="edit-icon"><img src="/images/edit.svg" alt=""></div>
    </div>
    <div class="role-info-container flex-column">
        <div class="role-info flex">
            <div><img src="/images/team_svgrepo.com.svg" alt=""></div>
            <div> Department</div>
            <div class="role-info-name">${role[1].employees[0].dept}</div>
        </div>
        <div class="role-info flex">
            <div><img src="/images/location-pin-alt-1_svgrepo.com.svg" alt=""></div>
            <div>Location</div>
            <div class="role-info-name">${role[1].employees[0].location}</div>
        </div>
        <div class="role-info flex">
            <p> Total Employees</p>
            <div class="employee-cnt-img flex">
                <img src="/images/admin-search.png" alt="">
                <img src="/images/admin-search.png" alt="">
                <img src="/images/admin-search.png" alt="">
                <img src="/images/admin-search.png" alt="">
                <p>${role[1].employees.length}</p>
            </div>
        </div>
    </div>
    <div class="view-btn flex ">
        <button onclick="handleViewEmployee('${role[0].split(' ').join('').toLowerCase()}')">View all Employees</button>
    <i class="fa-solid fa-arrow-right-long"></i></div>`;
    roleBlockContainer.appendChild(roleBlock);
}
function handleViewEmployee(roleName) {
    let url = "Role-detail/role-detail.html?" + roleName;
    window.open(url, "_self");
}
function saveRoleToSessionStorage(role) {
    let savedRoles = JSON.parse(sessionStorage.getItem("rolesDetail")) || [];
    savedRoles.push(role);
    sessionStorage.setItem("rolesDetail", JSON.stringify(savedRoles));
}
function populateRoles() {
    const roles = JSON.parse(sessionStorage.getItem('rolesDetail'));
    if (roles && roles.length > 0) {
        roles.forEach(role => {
            createRoleBlock(role);
        });
    } else {
        console.log('No employee data available.');
    }
}
function handleRoleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("roleForm");
    const formData = new FormData(form);
    let allEmployees = employeeDetails('employeesTableDetail');
    const roleName = formData.get("roleName");
    const department = formData.get("department");
    const location = formData.get("location");
    let employeesChecked = document.querySelectorAll(".select-items input");
    for (let i = 0; i < employeesChecked.length; i++) {
        if (employeesChecked[i].checked == true) {
            let currentEmployee;
            let id = employeesChecked[i].getAttribute('id');
            for (let j = 0; j < allEmployees.length; j++) {
                if (id == allEmployees[j].empNo) {
                    allEmployees[j].role = roleName;
                    allEmployees[j].dept = department;
                    currentEmployee = allEmployees[j]
                    console.log(allEmployees);
                }
            }
        }
    }
    sessionStorage.setItem("employeesTableDetail", JSON.stringify(allEmployees));
    checkRoles();
    window.location.href = "/Roles/Roles.html";
}
function checkRoles() {
    let employees = employeeDetails('employeesTableDetail');
    let roleMap = new Map();
    let roleIdCounter = 1;
    let roleId;
    for (let i = 0; i < employees.length; i++) {
        let element = employees[i].role;
        if (!roleMap.has(element)) {
            roleId = "R000" + roleIdCounter++;
            roleMap.set(element, { roleId: roleId, employees: [] });
        }
        let roleData = roleMap.get(element);
        roleData.employees.push(employees[i]);
        roleMap.set(element, roleData);
    }
    for (let i = 0; i < employees.length; i++) {
        let element = employees[i].role;
        employees[i].roleId = roleMap.get(element).roleId;
    }
    sessionStorage.setItem('rolesDetail', JSON.stringify([...roleMap]));
}
function unpoplateRoles() {
    let roleBlockContainer = document.getElementsByClassName('role-block-container')[0];
    while (roleBlockContainer.hasChildNodes())
        roleBlockContainer.removeChild(roleBlockContainer.lastChild);
}
