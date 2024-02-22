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

function sideBarClose() {
    const icon = document.querySelector(".collapse-btn");
    const mainBody = document.getElementById("main-body");
    const updateBlock = document.querySelector('.install-update');
    const sideBarOptions = document.querySelectorAll('.side-bar-options');
    const sideBarOptionsName = document.querySelectorAll('.text');
    const functioName = document.querySelectorAll('.function-name');
    const downArrow = document.querySelectorAll('.side-bar-options .arrow');
    const iconImage = document.querySelectorAll('.lock-icon img');
    const fullLogo = document.querySelector('.tezo-logo img');
    const logo = document.querySelector(".logo-icon img");
    fullLogo.style.display = "none";
    logo.style.display = "block";
    iconImage.forEach(img => {
        img.style.height = "1.5rem";
        img.style.marginBottom = ".5rem";
        img.style.marginTop = ".5rem";
    });
    downArrow.forEach(arrow => arrow.style.display = "none");
    sideBarOptionsName.forEach(name => name.style.display = "none");
    sideBarOptions.forEach(option => option.style.gridTemplateColumns = '1fr');
    functioName.forEach(name => name.style.display = "none");
    mainBody.style.gridTemplateColumns = "1fr 15fr";
    icon.style.transform = "rotate(180deg)";
    updateBlock.style.display = "none";
    isCollapsed = !isCollapsed;
}

function collapseSection1() {
    const icon = document.querySelector(".collapse-btn");
    const searchBar = document.querySelector(".search-bar");
    const employeeBody = document.querySelector(".employees-detail");
    const updateBlock = document.querySelector('.install-update');
    const mainBody = document.getElementById("main-body");
    if (!isCollapsed) {
        sideBarClose();
        icon.style.left = "-1%";
    } else {
        const sideBarOptions = document.querySelectorAll('.side-bar-options');
        const downArrow = document.querySelectorAll('.side-bar-options .arrow');
        const functioName = document.querySelectorAll('.function-name');
        const sideBarOptionsName = document.querySelectorAll('.text');
        const iconImage = document.querySelectorAll('.lock-icon img');
        const fullLogo = document.querySelector('.tezo-logo img');
        const logo = document.querySelector(".logo-icon img");
        sideBarOptions.forEach(option => option.style.gridTemplateColumns = '1fr 3fr 1fr');
        downArrow.forEach(arrow => arrow.style.display = "flex");
        functioName.forEach(name => name.style.display = "block");
        sideBarOptionsName.forEach(name => name.style.display = "block");
        iconImage.forEach(img => {
            img.style.height = "50%";
            img.style.marginBottom = "0rem";
            img.style.marginTop = "0rem";
        });
        fullLogo.style.display = "block";
        logo.style.display = "none";
        mainBody.style.gridTemplateColumns = "1fr 5fr";
        icon.style.transform = "rotate(0deg)";
        icon.style.left = "-2%";
        employeeBody.style.paddingLeft = "2%";
        searchBar.style.marginLeft = "0rem";
        updateBlock.style.display = "block";

        isCollapsed = !isCollapsed;
    }
}

function collapseSection2() {
    const icon = document.querySelector(".collapse-btn");
    const searchBar = document.querySelector(".search-bar");
    const mainBody = document.getElementById("main-body");
    const employeeBody = document.querySelector(".employees-detail");
    const logo = document.querySelector(".logo-icon img");
    logo.style.display = "none";
    mainBody.style.transition = 'none';
    if (!isCollapsed) {
        mainBody.style.gridTemplateColumns = "1fr 10fr";
        icon.style.transform = "rotate(0deg)";
        icon.style.left = "-1%";
        employeeBody.style.paddingLeft = "2%";
        isCollapsed = !isCollapsed;
        searchBar.style.marginLeft = "2rem";
    } else {
        sideBarClose();
        mainBody.style.gridTemplateColumns = "0fr 10fr";
        icon.style.left = "-2%";
    }
}

function collapseSection() {
    if (window.innerWidth >= 1080) {
        collapseSection1();
    } else {
        collapseSection2();
    }
}

function collapseDropdownTopbar() {
    const icon = document.getElementsByClassName("collapse-btn");

    const dropdownTopbarBlock = document.getElementById("topbar");
    if (statusTopbar == false) {
        dropdownTopbarBlock.style.display = "block";
        icon[1].style.transform = "rotate(90deg)";
        statusTopbar = !statusTopbar;
    }
    else {
        dropdownTopbarBlock.style.display = "none";
        icon[1].style.transform = "rotate(-90deg)";
        statusTopbar = !statusTopbar;
    }
}

let filterStatus = true;
function showFilter() {
    const alphabetFilter = document.getElementsByClassName("a-to-z-filter")[0];
    const filterBar = document.getElementsByClassName("filter-bar")[0];
    if (filterStatus) {
        filterBar.style.display = "flex";
        alphabetFilter.style.display = "flex";
        alphabetFilter.style.marginTop = "1rem";
        alphabetFilter.style.height = "1.7rem";
        filterStatus = !filterStatus;
    }
    else {
        filterBar.style.display = "none";
        alphabetFilter.style.display = "none";
        filterStatus = !filterStatus;
    }
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
    const employeeTableBody = document.getElementsByTagName('tbody')[0];
    let tr = document.createElement('tr');
    let checkbox = document.createElement('td');
    checkbox.className = 'check-box-col';
    let inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.classList.add('select');
    inputCheckbox.addEventListener("click", activateDeleteButton);
    checkbox.appendChild(inputCheckbox);
    tr.appendChild(checkbox);

    let listProfileName = document.createElement('div');
    let listProfileMail = document.createElement('div');
    listProfileName.className = 'list-profile-name';
    listProfileMail.classList.add('list-profile-mail', 'grey-color');
    listProfileName.textContent = employee.name;
    listProfileMail.textContent = employee.email;
    let listProfileDiv = document.createElement('div');
    listProfileDiv.appendChild(listProfileName);
    listProfileDiv.appendChild(listProfileMail);
    let profileImage = document.createElement('img');
    profileImage.src = employee.img;
    profileImage.alt = "profile";
    let listProfile = document.createElement('td');
    listProfile.classList.add('list-profile', 'flex');
    listProfile.appendChild(profileImage);
    listProfile.appendChild(listProfileDiv);
    listProfile.addEventListener("click", editEmployeeForm);
    tr.appendChild(listProfile);

    let location = document.createElement('td');
    location.classList.add('col', 'col-location');
    location.textContent = employee.location;
    location.addEventListener("click", editEmployeeForm);
    tr.appendChild(location);

    let department = document.createElement('td');
    department.classList.add('col', 'col-department');
    department.textContent = employee.dept;
    department.addEventListener("click", editEmployeeForm);
    tr.appendChild(department);

    let role = document.createElement('td');
    role.classList.add('col-role', 'col');
    role.textContent = employee.role;
    role.addEventListener("click", editEmployeeForm);
    tr.appendChild(role);

    let empNum = document.createElement('td');
    empNum.classList.add('col-emp-no', 'col');
    empNum.textContent = employee.empNo;
    empNum.addEventListener("click", editEmployeeForm);
    tr.appendChild(empNum);

    let activeBtn = document.createElement('div');
    activeBtn.textContent = employee.status;
    if (employee.status.toUpperCase() != 'ACTIVE') {
        activeBtn.className = 'btn-inactive';
    }
    else {
        activeBtn.className = 'btn-active';
    }
    activeBtn.addEventListener('click', toggleStatus);
    let activeStatus = document.createElement('td');
    activeStatus.classList.add('col-status', 'col');
    activeStatus.appendChild(activeBtn);
    tr.appendChild(activeStatus);

    let joinDate = document.createElement('td');
    joinDate.classList.add('col-join-dt', 'col');
    joinDate.textContent = employee.joinDate;
    joinDate.addEventListener("click", editEmployeeForm);
    tr.appendChild(joinDate);

    let dot = document.createElement('i');
    dot.classList.add('fa-solid', 'fa-ellipsis','elipsis');
    
    let more = document.createElement('td');
    more.classList.add('three-dots', 'col');
    more.appendChild(dot);
    var ellipsisParent = document.createElement('div');
    ellipsisParent.classList.add('ellipsis-menu', 'hide-ellipsis-menu', 'flex-column');
    var moreDetails = document.createElement('div');
    var edit = document.createElement('div');
    var dlt = document.createElement('div');
    moreDetails.classList.add('child');
    moreDetails.textContent = "More Details"
    moreDetails.addEventListener('click', editEmployeeForm);
    edit.classList.add('child');
    edit.textContent = 'Edit';
    edit.addEventListener('click', editEmployeeForm);
    dlt.classList.add('child');
    dlt.textContent = "Delete";
    dlt.addEventListener('click', ellipsisDelete);
    ellipsisParent.appendChild(moreDetails);
    ellipsisParent.appendChild(edit);
    ellipsisParent.appendChild(dlt);
    more.appendChild(ellipsisParent);
    tr.appendChild(more);
    

    employeeTableBody.appendChild(tr);
}

function toggleEditOption(event) {
    let threeDots = event.target;
    let allEllipsisMenu = threeDots.parentElement.querySelector(`.ellipsis-menu`);
    let isMenuVisible = !allEllipsisMenu.classList.contains('hide-ellipsis-menu') || allEllipsisMenu.style.display == 'none';
    console.log(isMenuVisible);
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
    let employeeTable = document.getElementById("employee-table");
    let tr = employeeTable.querySelectorAll('tr');
    let deleteBtn = document.getElementsByClassName("delete-btn")[0];
    for (i = 1; i < tr.length; i++) {
        let currentCheckbox = tr[i].getElementsByClassName('check-box-col')[0];
        let select = currentCheckbox.getElementsByTagName('input')[0];
        if (select.checked == true) {
            deleteBtn.style.backgroundColor = "#f44848";
            deleteBtn.disabled = false;
            return;
        }
    }
    deleteBtn.style.backgroundColor = "#f89191";
    deleteBtn.disabled = true;
}

function unpoplateTable() {
    let tbody = document.getElementsByTagName('tbody')[0];
    while (tbody.hasChildNodes())
        tbody.removeChild(tbody.lastChild);
}

function populateFilteredTable(filteredEmployees) {
    unpoplateTable();
    sessionStorage.setItem('FilteredEmployeesDetail', JSON.stringify(filteredEmployees));
    const employees = JSON.parse(sessionStorage.getItem('FilteredEmployeesDetail')) || [];
    if (employees && employees.length > 0) {
        employees.forEach(employee => {
            addRow(employee);
        });
    } else {
        console.log('No employee data available.');
    }
}
function setAlphabeticFilter() {
    var alphabetFilterParent = document.querySelector('.a-to-z-filter');
    var aplhabets = alphabetFilterParent.querySelectorAll('div:not(:first-child)');
    aplhabets.forEach(function (child) {
        child.onclick = function () {
            applyAlphabeticFilter(this);
        };
    });
}
function applyAlphabeticFilter(event) {
    var alphabetFilterParent = document.querySelector('.a-to-z-filter');
    var allAlphabets = alphabetFilterParent.querySelectorAll('div:not(:first-child)');
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
    const employees = JSON.parse(sessionStorage.getItem(key));
    return employees;
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
}
function toggleFilter(filterId) {
    const filter = document.querySelector(`#${filterId}-filter .${filterId}-dropdown`);
    filter.classList.toggle('hide');
}
function selectFilter(event) {
    console.log(event);
    let checkbox = this.querySelector('input');
    const element = event.target;
    if (element == checkbox)
        return;
    if (checkbox.checked)
        checkbox.checked = false;
    else
        checkbox.checked = true;
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
    // checkAlphabeticFilter();
    populateFilteredTable(filteredEmployees);
}

// function checkAlphabeticFilter() {
//     var alphabetFilterParent = document.querySelector('.a-to-z-filter');
//     var allAlphabets = alphabetFilterParent.querySelectorAll('div:not(:first-child)');
//     let selectedAlphabet = null;
//     allAlphabets.forEach(x => {
//         if (x.classList.contains('selected')) {
//             selectedAlphabet = x;
//         }
//         x.classList.remove('selected')
//     });
//     var filterIcon = document.getElementById('filter-icon');
//     filterIcon.classList.remove('selected');
//     if (selectedAlphabet != null)
//         selectedAlphabet.click();
//     // applyAlphabeticFilter(selectedAlphabet);
// }
function resetFilter() {
    var status = document.querySelector("#status-filter .status-dropdown");
    var department = document.querySelector("#department-filter .department-dropdown");
    var location = document.querySelector("#location-filter .location-dropdown");
    if (!status.classList.contains('hide'))
        status.classList.add('hide');
    if (!department.classList.contains('hide'))
        department.classList.add('hide');
    if (!location.classList.contains('hide'))
        location.classList.add('hide');
    let input = document.querySelectorAll('.filter-options-container input');
    input.forEach((element) => { element.checked = false });
    var alphabetFilterParent = document.querySelector('.a-to-z-filter');
    var allAlphabets = alphabetFilterParent.querySelectorAll('div:not(:first-child)');
    allAlphabets.forEach(x => { x.classList.remove('selected') });
    var filterIcon = document.getElementById('filter-icon');
    filterIcon.classList.remove('selected');
    unpoplateTable()
    populateTable();
    checkdisableFilterButton();
    // checkAlphabeticFilter();
    disableFilterBtn();
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
    var deleteConfirmation = document.getElementsByClassName('delete-confirmation')[0];
    deleteConfirmation.classList.add('show-delete-confirmation');
}
function closeDeleteConfirmation() {
    var deleteConfirmation = document.getElementsByClassName('delete-confirmation')[0];
    deleteConfirmation.classList.remove('show-delete-confirmation');
}
function deleteRow() {
    const employeeTable = document.getElementById("employee-table");
    var rows = employeeTable.getElementsByTagName('tr');
    var checkbox = document.querySelectorAll('.check-box-col input');
    for (var i = 1; i < rows.length; i++) {
        if (checkbox[i].checked) {
            deleteFromSessionStorage(rows[i]);
        }
    }
    closeDeleteConfirmation();
    unpoplateTable();
    populateTable();
}

function tableToCSV() {
    let employees = employeeDetails('FilteredEmployeesDetail');
    console.log(employees);
    let csvContent = arrayToCSV(employees);
    console.log(csvContent);
    downloadCSVFile(csvContent);
}

function arrayToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let headers = Object.keys(array[0]).filter(header => (header !== "img" && header !== "mobile"));
    //     let str = `${headers.map(value => `"${value}"`).join(",")}\r\n`;
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
    let employeeTable = document.getElementById('employee-table');
    let tableHeaders = employeeTable.getElementsByTagName('th');
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
    unpoplateTable();
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
    unpoplateTable();
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
    else{
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
    document.addEventListener('click',(event)=>{
        if (event.target.contains(AddEmployeeModal)) {
            closeAddEmployeeModal();
        }
        else{
            AddEmployeeModal.style.display='';
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
                    allEmployees[j].role=roleName;
                    allEmployees[j].dept=department;
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
