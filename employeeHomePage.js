document.addEventListener("DOMContentLoaded", async function () {

    async function employeeRowsJson() {
        try {
            if (!sessionStorage.getItem('employeesTableDetail')) {
                const response = await fetch("../employeesDetails.json");
                var employeeList = await response.json();
                for (let i = 0; i < employeeList.length; i++) {
                    saveToSessionStorage(employeeList[i]);
                }
                window.location.reload();
                resetFilterStorage();
            }
        } catch (error) {
            console.error("Error fetching JSON:", error);
        }
    }
    let uploadProfilePic = document.getElementById('profileImageInput');
    uploadProfilePic.addEventListener('change', displayImagePreview);
    employeeRowsJson();
    populateTable();
    setAlphabeticFilter();
    sortEmployeeTable();
    disableFilterButton();
    checkRoles();
    let threeDots=document.querySelectorAll('.elipsis');
    threeDots.forEach((dots)=>{
        dots.addEventListener('click',toggleEditOption)
    })
    let searchInput = document.querySelector(".search-input input");
    searchInput.addEventListener('input', searchBar);
    const addEmployeeForm = document.getElementsByClassName('add-employee-form')[0];
    addEmployeeForm.addEventListener("submit", checkValidation);
    let input = document.querySelectorAll('.filter-options-container input');
    for (let i = 0; i < input.length; i++) {
        select = input[i].parentNode;
        select.addEventListener('click', selectFilter)
    }
});
