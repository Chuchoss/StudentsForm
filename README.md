  <h1 align="center">Students List<h1>
  <p align="center"><img align="center" src="https://user-images.githubusercontent.com/99849325/174464406-9271ff3a-7c6f-46f9-9753-06b135a4c04d.png"/></p>


## Описание
В данном проекте я практиковал подход разделения данных и представления.
В результате получилось создать панель управления студентами, на которой располагаются: 
- таблица со студентами с фильтрами и сортировкой
- форма добавления нового студента

Каждый студент должен иметь:
- имя
- фамилия
- отчество
- дата рождения (объект Date)
- год начала обучения
- факультет (строка)

Для добавления студента на странице выводится форма с полями, соответствующими данным студента. 
Форма должна проходить валидацию по следующим правилам:
- все поля обязательны для заполнения
- дата рождения находится в диапазоне от 01.01.1900 до текущей даты
- год начала обучения находится в диапазоне от 2000-го до текущего года

Валидация проходит нажатия на кнопку "добавить студента", расположенную под полями для ввода. 
Если валидация прошла успешно, то все поля очищаются, а новый студент добавляется в таблицу. 
В противном случае над кнопкой выводится сообщение с описанием ошибок для пользователя

Каждая строка таблицы содержит информацию об одном студенте.
Первая строка таблицы - заголовочная, в ней указываются заголовки колонок (ФИО, Факультет, ДР и возраст, Годы обучения).
При нажатии на ячейку заголовочной строки происхоодит сортировка по соответствующим полям студентов:

ФИО сортирует по соединённой строке из фамилии, имени и отчества по алфавиту по возрастанию
Факультет - по факультету по алфавиту по возрастанию
ДР и возраст - по дате рождения по возрастанию
Годы обучения - по году начала обучения
Перед таблицей также есть фильтры, состоящие из полей:

ФИО для поиска подстроки в фамилии, имени или отчестве
Факультет для поиска подстроки в названии факультета
Год начала обучения (точное совпадение)
Год окончания обучения (точное совпадение)
