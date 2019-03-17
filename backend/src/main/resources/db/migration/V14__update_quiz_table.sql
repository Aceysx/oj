alter table quiz add column type varchar(30) default '单选题';
alter table quiz modify answer varchar(10000);