INSERT INTO deptT (name)
VALUES ('test_dep1'),
        ('test_dep2'),
        ('test_dep3'),
        ('test_dep4');

INSERT INTO roleT ( title, salary, department_id)
VALUES ('test_title1', 1.1, 1),
        ('test_title2', 2.2, 2),
        ('test_title3', 3.3, 3),
        ('test_title4', 4.4, 4);

INSERT INTO emT (first_name, last_name, role_id, manager_id)
VALUES ('test_first_name1', 'test_last_name1', 1, null),
        ('test_first_name2', 'test_last_name2', 2, 1),
        ('test_first_name3', 'test_last_name3', 3, 1),
        ('test_first_name4', 'test_last_name4', 4, 1);