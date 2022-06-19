(function() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
   } 
  today = yyyy + '-' + mm + '-' + dd;

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("birthday-date").setAttribute("max", today);
    document.getElementById("start-year").setAttribute("max", yyyy);
    const nameInput = document.getElementById('name');
    const surnameInput= document.getElementById('surname');
    const middleNameInput = document.getElementById('middleName');
    const birthdayDateInput = document.getElementById('birthday-date');
    const startYearInput = document.getElementById('start-year');
    const facultyInput = document.getElementById('faculty');
    let inputsList = [nameInput, surnameInput, middleNameInput, birthdayDateInput, startYearInput, facultyInput];
    inputsList.unshift(...inputsList.splice(1,1));
    const form = document.getElementById('form');
    const error = document.querySelectorAll('.error');

    let cloneStudentsArray;
    let students = [];
    let validationsStatus = [];
    const tbody = document.getElementById('tbody');
  
      function getСurrentAge(date) {
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
      }

      function fixFullName(name) {
        return name.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      }

      function getCurrentCourse(studyYears) {
        if (mm >= 9) {
          if ((Number(yyyy) - Number(studyYears) === 4)) {
            return(`${studyYears}-${Number(studyYears) + 4} (Только закончил)`)
          }
          if ((Number(yyyy) - Number(studyYears)) > 4) {
            return(`${studyYears}-${Number(studyYears) + 4} Закончил`)
          }
          if ((Number(yyyy) - Number(studyYears)) < 4) {
            return(`${studyYears}-${Number(studyYears) + 4} (${(Number(yyyy) - Number(studyYears) + 1)} курс)`)
          }
        } else {
          if ((Number(yyyy) - Number(studyYears) === 4)) {
            return(`${studyYears}-${Number(studyYears) + 4} (Почти закончил(${(Number(yyyy) - Number(studyYears))} курс))`)
          }
          if ((Number(yyyy) - Number(studyYears)) > 4) {
            return(`${studyYears}-${Number(studyYears) + 4} (Закончил)`)
          }
          if ((Number(yyyy) - Number(studyYears)) < 4) {
            return(`${studyYears}-${Number(studyYears) + 4} (${(Number(yyyy) - Number(studyYears))} курс)`)
          }
        }
      }

      function pushToTable(student) {
        let table = document.getElementById('table');
        let tbody = document.getElementById('tbody')
        let line = document.createElement('tr');
        let cellFullName = document.createElement('td');
        let cellfacultyInput = document.createElement('td');
        let cellbirthdayDate = document.createElement('td');
        let cellstartYear = document.createElement('td');
        cellFullName.textContent = student.fullName;
        cellbirthdayDate.textContent = String(student.birthdayDateInput)
        .split('-')
        .reverse()
        .join('.') + ` (возраст: ${getСurrentAge(student.birthdayDateInput)})`;
        cellstartYear.textContent = getCurrentCourse(student.startYearInput)
        cellfacultyInput.textContent = student.facultyInput;
       

        table.append(tbody)
        tbody.append(line)
        line.append(cellFullName, cellfacultyInput, cellbirthdayDate, cellstartYear)
       }
  

      function addNewStudent() {
        let student = new Object();
        let fullNameArray = [];

        student.name = fixFullName(nameInput.value);
        student.surname = fixFullName(surnameInput.value);
        student.middleNameInput = fixFullName(middleNameInput.value);
        student.birthdayDateInput = birthdayDateInput.value;
        student.startYearInput = startYearInput.value;
        student.facultyInput = facultyInput.value;
        student.currentCurse = getCurrentCourse(student.startYearInput);
        student.currentAge = getСurrentAge(student.birthdayDateInput);

        fullNameArray.push(student.surname, student.name, student.middleNameInput);
        let fullNameArraySplit = fullNameArray.join(' ');
        student.fullName = fullNameArraySplit;
    
        pushToTable(student)
        students.push(student)
        
        nameInput.value = '';
        surnameInput.value = '';
        middleNameInput.value = '';
        birthdayDateInput.value = '';
        startYearInput.value = '';
        facultyInput.value = '';
       }

       const titles = document.querySelectorAll('.title');
       const inputsFilter = document.querySelectorAll('.inputFilter');

       function sortMapFunction(xName, yName) {
        return xName.split(/\s+/).join('').localeCompare(yName.split(/\s+/).join(''));
       }

       const sortMap = {
        fullnametitle(x, y) {
          return sortMapFunction(x.fullName, y.fullName);
        },
        facultytitle(x, y) {
          return sortMapFunction(x.facultyInput, y.facultyInput);
        },
        age(x, y) {
          return sortMapFunction(x.birthdayDateInput, y.birthdayDateInput);
        },
        studyAges(x, y) {
          return sortMapFunction(x.startYearInput, y.startYearInput);
        }
      }
   
       titles.forEach(el => {
        el.addEventListener('click', () => {
            cloneStudentsArray = Object.assign([], students).sort(sortMap[el.id]);
            while (tbody.firstChild) {
              tbody.removeChild(tbody.firstChild)
            }
            cloneStudentsArray.forEach(student => {
              pushToTable(student)
            })
        })
      })

      inputsFilter.forEach((inp, index) => {
        inp.addEventListener('input', () => {
          cloneStudentsArray = Object.assign([], students);
          while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild) 
          }
          cloneStudentsArray.forEach(student => {
            student.endYearStudy = String(Number(student.startYearInput) + 4);
            let studentsArguments = [student.fullName, student.facultyInput, student.startYearInput, student.endYearStudy]
            if (studentsArguments[index].toUpperCase().includes(inp.value.toUpperCase())) {
              pushToTable(student)
            }
          })
        })
      })


      function showError(inputName, inputError) {
        if (inputName.validity.rangeOverflow) { 
          inputError.textContent = 'Вау, ты из будущего!';
        } else if (inputName.validity.rangeUnderflow) { 
          inputError.textContent = 'Слишком маленькое число';
        } else if(inputName.validity.patternMismatch) {
          inputError.textContent = `Неверный формат, введите ${inputName.placeholder} `;
         } else if(inputName.validity.valueMissing) {
           inputError.textContent = 'Поле не должно быть пустым';
         } else if(inputName.validity.typeMismatch) {
           inputError.textContent = 'Некорректный тип данных';
         } else if(inputName.validity.tooShort) {
           inputError.textContent = `Должно содержаться минимум ${ inputName.minLength } символов`;
         }
         inputError.className = 'error active';
       }

       function validate (nameInput, error) {
         if(!nameInput.validity.valid) {
            showError(nameInput, error);
            validationsStatus.push(false);
          }
          if (nameInput.validity.valid) {
            error.textContent = ''; // Сбросить содержимое сообщения
            error.className = 'error'; // Сбросить визуальное состояние сообщения  
            validationsStatus.push(true);
          } else {
            showError(nameInput, error);
          }
          return validationsStatus
       }

      form.addEventListener('submit', function(e) {
        for (let i = 0; i < inputsList.length; i++) {
          validate(inputsList[i], error[i])
          console.log()
        }
        if (!validationsStatus.includes(false)) {
          addNewStudent();
        }
            validationsStatus = []
            e.preventDefault();
      })
   })
})()

