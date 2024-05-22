// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
        "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
      );
      console.log("tabla usuarios creada!");
      await db.run(
        "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
      );
    }
  
    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosfamilias'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        "CREATE table articulosfamilias( IdArticuloFamilia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
      );
      console.log("tabla articulosfamilias creada!");
      await db.run(
        "insert into articulosfamilias values	(1,'ACCESORIOS'),(2,'AUDIO'),(3,'CELULARES'),(4,'CUIDADO PERSONAL'),(5,'DVD'),(6,'FOTOGRAFIA'),(7,'FRIO-CALOR'),(8,'GPS'),(9,'INFORMATICA'),(10,'LED - LCD');"
      );
    }
  
    existe = false;
    sql =
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table articulos( 
                    IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT
                  , Nombre text NOT NULL UNIQUE
                  , Precio real
                  , CodigoDeBarra
                  , IdArticuloFamilia integer
                  , Stock integer
                  , FechaAlta text
                  , Activo boolean,
                  FOREIGN KEY (IdArticuloFamilia) REFERENCES articulosfamilias(IdArticuloFamilia)
                  );`
          );
          console.log("tabla articulos creada!");
      
          await db.run(
            `insert into articulos values
            (1,'KIT DIRECT TV PREPA 0.60MT',299.00, '0779815559001', 10, 329,'2017-01-19', 1 ),
            (2,'KIT DIRECT TV PREPA 0.90MT',349.00, '0779815559002', 10, 468,'2017-01-31', 1 ),
            (3,'LED 22" LG FHD 22MN42APM',2669.00, '0779808338808', 10, 536,'2017-01-12', 1 ),
            (4,'LED 24" ILO HD DIGITAL MOD LDH24ILO02',2999.00, '0779696260024', 10, 169,'2017-01-30', 1 ),
            (5,'LED 24" LG HD 24MN42A-PM',3129.00, '0779808338809', 10, 296,'2016-12-28', 1 ),
            (7,'LED 32" BGH HD BLE3214D',4830.00, '0779688540133', 10, 998,'2017-01-01', 1 ),
            (8,'LED 32" BGH SMART TV BLE3213RT',5405.00, '0779688540117', 10, 650,'2017-01-18', 1 ),
            (9,'LED 32" HISENSE IPTV HLE3213RT',5290.00, '0779688540119', 10, 51,'2017-02-03', 1 ),
            (10,'LED 32" HITACHI HD CDHLE32FD10',4837.00, '0779694109973', 10, 838,'2016-12-25', 1 ),
            (11,'LED 32" ILO HD DIGITAL LDH32ILO02',4199.00, '0779696260132', 10, 501,'2017-01-25', 1 ),
            (12,'LED 32" JVC HD IPTV LT32DR930',6699.00, '0779818058057', 10,
            906,'2017-01-25', 1 ),
            (13,'LED 32" JVC HD LT32DA330',4499.00, '0779696266323', 10, 435,'2017-02-07', 1 ),
            (14,'LED 32" LG 3D 32LA613B',6299.00, '0779808338816', 10, 329,'2017-02-06', 1 ),
            (15,'LED 32" PHILIPS FHD 32PFL3018D/77',6799.00, '0871258168715', 10, 971,'2016-12-25', 1 ),
            (16,'LED 32" PHILIPS FHD IPTV 32PFL4508G/77',7699.00, '0871258167198', 10, 636,'2017-02-07', 1 ),
            (17,'LED 32" PHILIPS HD 32PFL3008D/77',5799.00, '0871258167218', 10, 67,'2016-12-27', 1 ),
            (18,'LED 32" PHILIPS SMART TV 32PFL3518G/77',7399.00, '0871258167225', 10, 250,'2017-01-08', 1 ),
            (19,'LED 32" RCA HD L32S80DIGI',4499.00, '0779694101214', 10, 857,'2017-01-23', 1 ),
            (20,'LED 32" SAMSUNG FHD UN32F5000',6094.00, '0880608543154', 10, 636,'2016-12-30', 1 ),
            (21,'LED 32" SAMSUNG HD UN32F4000',5519.00, '0880608543153', 10, 37,'2017-01-23', 1 ),
            (22,'LED 32" SAMSUNG SMART UN32F5500',6899.00, '0880608548607', 10, 214,'2017-01-24', 1 ),
            (23,'LED 32" SONY HD KDL32R425',6199.00, '0490552491740', 10, 642,'2017-01-17', 1 ),
            (24,'LED 32" SONY SMART TV KDL32W655',6999.00, '0490552491687', 10, 50,'2017-02-04', 1 ),
            (25,'LED 39" ILO DIG FHD LDF39ILO2',5699.00, '0779696260394', 10, 951,'2017-01-19', 1 ),
            (26,'LED 39" PHILIPS FHD IPTV 39PFL3508G/77',8799.00, '0871258168717', 10, 889,'2017-02-03', 1 ),
            (27,'LED 39" RCA FHD L39S85DIGIFHD',6499.00, '0779694101215', 10, 487,'2016-12-25', 1 ),
            (28,'LED 40" BGH FHD BLE4014D',7245.00, '0779688540132', 10, 480,'2016-12-27', 1 ),
            (29,'LED 40" SAMSUNG 3D SMART UN40F6800',13224.00, '0880608565606', 10, 734,'2017-01-26', 1 ),
            (30,'LED 40" SAMSUNG 3D UN40F6100',9999.00, '0880608544958', 10, 835,'2017-01-19', 1 ),
            (31,'LED 40" SAMSUNG FHD UN40F5000',8164.00, '0880608543156', 10, 436,'2017-02-01', 1 ),
            (32,'LED 40" SAMSUNG SMART UN40F5500',9774.00, '0880608565438', 10,
            639,'2017-01-20', 1 ),
            (33,'LED 40" SONY FHD KDL40R485',7499.00, '0490552493532', 10, 862,'2017-01-07', 1 ),
            (34,'LED 42" LG 3D 42LA6130',9199.00, '0779808338817', 10, 560,'2017-01-05', 1 ),
            (35,'LED 42" LG FHD 42LN5400',8099.00, '0779808338818', 10, 48,'2017-01-28', 1 ),
            (36,'LED 42" LG SMART TV 42LN5700',9799.00, '0779808338823', 10, 967,'2017-01-27', 1 ),
            (37,'LED 42" PANASONIC 3D SMART TV TCL42ET60',11249.00, '0779805518074', 10, 570,'2017-01-19', 1 ),
            (38,'LED 42" PHILIPS 3D SMART TV 42PFL5008G/7',11599.00, '0871258167039', 10, 802,'2017-02-04', 1 ),
            (39,'LED 42" PHILIPS FHD 42PFL3008D/77',8499.00, '0871258167221', 10, 193,'2017-02-04', 1 ),
            (40,'LED 42" PHILIPS SMART TV 42PFL3508G/77',9499.00, '0871258167227', 10, 693,'2016-12-30', 1 ),
            (41,'LED 42" PIONEER 3D SMART PLE42FZP2',12299.00, '0498802821943', 10, 907,'2017-02-01', 1 ),
            (42,'LED 42" SONY FHD KDL42R475',7999.00, '0490552491728', 10, 140,'2017-01-13', 1 ),
            (43,'LED 46" PHILIPS SMART TV 46PFL4508G/7',13999.00, '0871258168718', 10, 236,'2017-01-31', 1 ),
            (44,'LED 46" SAMSUNG 3D SMART TV UN46F7500',23574.00, '0880608565943', 10, 143,'2016-12-25', 1 ),
            (45,'LED 46" SAMSUNG SMART UN46F5500',13224.00, '0880608548610', 10, 345,'2017-01-07', 1 ),
            (46,'LED 46" SANYO SMART TV LCE46IF12',10599.00, '0779696260612', 10, 557,'2017-02-03', 1 ),
            (47,'LED 47" LG SMART TV 47LN5700',13199.00, '0779808338824', 10, 599,'2017-01-20', 1 ),
            (48,'LED 47" PIONEER 3D SMART PLE47FZP1',15999.00, '0498802821947', 10, 310,'2017-02-07', 1 ),
            (49,'LED 47" SONY 3D SMART TV KDL47W805',17199.00, '0490552494098', 10, 526,'2017-01-31', 1 ),
            (50,'LED 55" NOBLEX 3D IPTV 55LD856DI',20799.00, '0779696260000', 10, 362,'2017-01-26', 1 ),
            (51,'LED 55" PHILIPS 3D SMART TV 55PFL8008G/77',29999.00, '0871258166949', 10, 841,'2017-01-06', 1 ),
            (52,'SOPORTE LCD / LED DE 14" A 42" TANGWOOD',599.00, '0779814176493',
            10, 527,'2017-02-07', 1 ),
            (53,'SOPORTE LCD / LED DE 17 '' A 40 ''',499.00, '0779814176654', 10, 588,'2016-12-23', 1 ),
            (54,'SOPORTE LCD / LED DE 17" A 37" TANGWOOD',225.00, '0779814176489', 10, 687,'2017-01-29', 1 ),
            (55,'SOPORTE LCD / LED DE 23 '' A 50 ''',350.00, '0779814176652', 10, 519,'2016-12-25', 1 ),
            (56,'SOPORTE LCD / LED DE 26" A 47" TANGWOOD',350.00, '0779814176442', 10, 81,'2017-01-28', 1 ),
            (57,'SOPORTE LCD / LED TGW DE 17 '' A 37 ''',199.00, '0779814176648', 10, 164,'2017-01-17', 1 ),
            (58,'SOPORTE LCD 10" TAGWOOD',375.00, '0779814176490', 10, 217,'2017-01-31', 1 ),
            (59,'SOPORTE LCD 32" NAKAN',199.00, '0779803504550', 10, 873,'2017-01-01', 1 ),
            (60,'SOPORTE LCD 32" ONE FOR ALL',259.00, '0871618404213', 10, 585,'2017-01-30', 1 ),
            (61,'SOPORTE LCD 40" ONE FOR ALL',519.00, '0871618404215', 10, 809,'2017-01-22', 1 ),
            (62,'SOPORTE LCD/LED 23 A 46"',399.00, '0779814176617', 10, 470,'2017-01-21', 1 ),
            (68,'SOPORTE GPS',119.00, '0779814176084', 8, 524,'2017-01-14', 1 ),
            (69,'SOPORTE GPS NEGRO MOTO 3,5" - 5,5"',259.00, '0779808004535', 8, 800,'2017-02-05', 1 ),
            (70,'GPS GARMIN NUVI 2595',2899.00, '0075375999226', 8, 745,'2017-02-07', 1 ),
            (71,'GPS GARMIN NUVI 52',2149.00, '0075375999808', 8, 274,'2016-12-22', 1 ),
            (72,'GPS X VIEW VENTURA TV 7"',1849.00, '0779804220262', 8, 150,'2016-12-30', 1 ),
            (73,'GPS XVIEW VENTURA TV',1509.00, '0779804220220', 8, 183,'2017-01-05', 1 ),
            (74,'MOUSE HP 2.4G SILVER WIRELESS OPT CAN/EN',199.00, '0088496276058', 9, 40,'2017-02-03', 1 ),
            (75,'PENDRIVE KINGSTONE DT101G2 8GB',129.00, '0074061716983', 9, 537,'2016-12-21', 1 ),
            (76,'PENDRIVE SANDISK BLADE 4GB',129.00, '0061965900041', 9, 340,'2017-02-02', 1 ),
            (77,'PENDRIVE SANDISK CRUZAR ORBIT 8GB',159.00, '0061965909040', 9, 696,'2017-02-07', 1 ),
            (78,'PENDRIVE SANDISK POP BLACK 8GB',159.00, '0061965908448', 9, 431,'2017-01-08', 1 ),
            (79,'PENDRIVE SANDISK POP PAIN 8GB',159.00, '0061965908156', 9, 521,'2017-02-01', 1 ),
            (80,'CARTUCHO EPSON 732 CYAN',10290.00, '0001034385887', 9, 234,'2017-01-26', 1 ),
            (81,'CARTUCHO EPSON T133120-AL MAGENTA',9690.00, '0001034387695', 9, 374,'2016-12-26', 1 ),
            (82,'CARTUCHO EPSON T133120-AL NEGRO',8479.00, '0001034387692', 9, 836,'2017-01-25', 1 ),
            (83,'CARTUCHO EPSON T133420-AL AMARILLO',9690.00, '0001034387696', 9, 796,'2016-12-28', 1 ),
            (84,'CARTUCHO HP 122 NEGRO',149.00, '0088496298354', 9, 373,'2017-02-05', 1 ),
            (85,'CARTUCHO HP 22 COLOR',299.00, '0082916090222', 9, 199,'2017-01-01', 1 ),
            (86,'CARTUCHO HP 60 COLOR',289.00, '0088358598319', 9, 801,'2017-01-31', 1 ),
            (87,'CARTUCHO HP 60 NEGRO',199.00, '0088358598317', 9, 655,'2017-01-08', 1 ),
            (88,'PC ALL IN ONE 120-1156LA + TECLADO INAL + MOUSE',5499.00, '0088611278012', 9, 331,'2017-01-19', 1 ),
            (90,'IMPRESORA MULTIFUNCION EPSON L355',3999.00, '0001034390469', 9, 293,'2017-01-01', 1 ),
            (91,'MULTIFUNCION EPSON L210 + SISTEMA CONTINUO',3399.00, '0001034390433', 9, 689,'2017-01-09', 1 ),
            (92,'MULTIFUNCION EPSON XP211',1199.00, '0001034390754', 9, 693,'2017-01-08', 1 ),
            (93,'MULTIFUNCION EPSON XP401',1799.00, '0001034390348', 9, 363,'2017-01-17', 1 ),
            (94,'NOTEBOOK BGH C-530 3D',4999.00, '0779816664067', 9, 401,'2017-01-30', 1 ),
            (95,'NOTEBOOK BGH C-550',5799.00, '0779816664065', 9, 230,'2017-01-04', 1 ),
            (96,'NOTEBOOK BGH C-565',6299.00, '0779816664069', 9, 876,'2017-02-06', 1 ),
            (97,'NOTEBOOK BGH C-570',7299.00, '0779816664070', 9, 929,'2017-01-17', 1 ),
            (98,'NOTEBOOK BGH QL 300 MINI',3699.00, '0779816664101', 9, 176,'2017-01-28', 1 ),
            (99,'NOTEBOOK DELL INSPIRON 14 3421 I14I32_45',6599.00, '0789948950198', 9, 758,'2016-12-31', 1 ),
            (100,'NOTEBOOK DELL INSPIRON 14 3421 I14V997_4',5999.00, '0779801657005', 9, 666,'2016-12-20', 1 ),
            (101,'NOTEBOOK LENOVO G485 C-70',4399.00, '0088761972842', 9, 115,'2017-01-21', 1 ),
            (102,'NOTEBOOK NOBLEX CEVEN GFAST',4499.00, '0779808041201', 9, 853,'2017-02-07', 1 ),
            (103,'NOTEBOOK POSITIVO BGH F-810N NEGRA',4999.00, '0779816664059', 9, 48,'2017-01-21', 1 ),
            (104,'NOTEBOOK SAMSUNG NP300E4C',6999.00, '0880608528173', 9, 272,'2017-01-08', 1 ),
            (105,'NOTEBOOK SAMSUNG NP300E5A AD4AR',4799.00, '0880608500428', 9, 194,'2017-01-18', 1 ),
            (106,'ULTRABOOK ACER S3-391-6867',9793.00, '0471219655495', 9, 974,'2017-01-23', 1 ),
            (107,'ADAPTADOR PCI WIFI TL-WN751ND',259.00, '0693536405056', 9, 171,'2017-01-15', 0 ),
            (110,'ANTENA TP-LINK TL-ANT2408C',249.00, '0693536405216', 9, 689,'2016-12-26', 1 ),
            (111,'MINI ADAPATADOR USB TP LINK WN723N',185.00, '0693536405055', 9, 382,'2016-12-31', 1 ),
            (112,'ROUTER MR3420 3G TP-LINK',649.00, '0693536405149', 9, 143,'2016-12-21', 1 ),
            (113,'ROUTER PORTATIL TP LINK TL-MR3020',499.00, '0693536405170', 9, 594,'2017-02-01', 1 ),
            (114,'ROUTER TL-WR941ND TP LINK',759.00, '0693536405127', 9, 646,'2017-02-06', 1 ),
            (115,'ROUTER TP-LINK TL-WR720N',309.00, '0693536405198', 9, 867,'2017-01-01', 1 ),
            (116,'ROUTER WR740 TP-LINK',389.00, '0693536405133', 9, 925,'2017-01-28', 1 ),
            (117,'ROUTER WR841 TP-LINK',469.00, '0693536405124', 9, 624,'2017-01-29', 1 ),
            (118,'TABLET MAGNUM TECH 7"',2599.00, '0779813546539', 9, 344,'2016-12-26', 1 ),
            (119,'TABLET 10" MAGNUM TECH 8GB 1GBM',3799.00, '0779813546540', 9, 751,'2017-01-24', 1 ),
            (120,'TABLET 10" NOBLEX NB1012',3549.00, '0779696292015', 9, 319,'2017-01-13', 1 ),
            (121,'TABLET ALCATEL AB10',1799.00, '0695508989953', 9, 939,'2017-02-01', 1 ),
            (122,'TABLET EUROCASE ARS 708',1099.00, '0779813546928', 9, 534,'2017-01-26', 1 ),
            (123,'TABLET FUNTAB PRO',1699.00, '0081770701101', 9, 869,'2017-01-23', 1 ),
            (124,'TABLET IDEAPAD LENOVO A1000L',2799.00, '0088794260611', 9, 597,'2017-01-05', 1 ),
            (125,'TABLET LENOVO IDEAPAD A1000 7"',2299.00, '0088777046041', 9, 510,'2017-02-04', 1 ),
            (126,'TABLET MAGNUM MG-701',1499.00, '0779813546946', 9, 645,'2017-02-05', 1 ),
            (127,'TABLET NOBLEX-8013 8''',2149.00, '0779696291801', 9, 850,'2017-01-17', 1 ),
            (130,'TABLET OLIPAD SMART 7" 3G',1499.00, '0802033432056', 9, 489,'2017-02-07', 1 ),
            (131,'TABLET PC 7001 TITAN',999.00, '0076113310158', 9, 850,'2016-12-24', 1 ),
            (132,'TABLET PC BOX T700U 7" DUAL CORE',1999.00, '0779815876409', 9, 769,'2017-02-06', 1 ),
            (133,'TABLET PC FIRSTAR MID070A 8650',799.00, '0779815467080', 9, 9,'2017-01-23', 1 ),
            (134,'TABLET PCBOX MOD T900',2799.00, '0779815876410', 9, 501,'2017-01-25', 1 ),
            (135,'TABLET POLAROID MID1000 10',4299.00, '0358417655560', 9, 151,'2016-12-23', 1 ),
            (136,'TABLET SYNKOM 7"',2499.00, '0779816920041', 9, 695,'2016-12-23', 1 ),
            (137,'TABLET XVIEW ALPHA2 8GB',1899.00, '0779804220264', 9, 565,'2017-02-05', 1 ),
            (138,'TABLET XVIEW PROTON',1699.00, '0779804220247', 9, 3,'2016-12-28', 1 ),
            (139,'AIRE ACONDICIONADO DAEWOO 3200FC DWT23200FC',5898.00, '0779816944014', 7, 668,'2018-01-04', 1 ),
            (140,'AIRE ACONDICIONADO DURABRAND 3500FC DUS35WCL4',5499.00, '0779688543933', 7, 945,'2017-01-20', 1 ),
            (141,'AIRE ACONDICIONADO DURABRAND 4500FC DUS53WCL4',7499.00, '0779688543937', 7, 962,'2016-12-29', 1 ),
            (142,'AIRE ACONDICIONADO KELVINATOR 2500WFC COD1056',4499.00, '0779694101056', 7, 670,'2017-01-03', 1 ),
            (143,'AIRE ACONDICIONADO LG 3000 FC H126TNW0',7499.00, '0779808338858', 7, 441,'2017-01-09', 1 ),
            (144,'AIRE ACONDICIONADO LG 4500 FC H1865NW0',10399.00, '0779808338859', 7, 971,'2016-12-23', 1 ),
            (145,'AIRE ACONDICIONADO LG 5500 FC H2465NW0',12699.00, '0779808338860', 7, 648,'2017-01-15', 1 ),
            (146,'AIRE ACONDICIONADO LG ARTCOOL 2300FC H096EFT0',7999.00, '0779808338853', 7, 659,'2017-01-01', 1 ),
            (147,'AIRE ACONDICIONADO LG ARTCOOL 4500FC H1868FT0',12899.00, '0779808338855', 7, 712,'2016-12-25', 1 ),
            (148,'AIRE ACONDICIONADO PHILCO 3200W FC PHS32H13X',6199.00, '0779696244974', 7, 588,'2017-01-09', 1 ),
            (149,'AIRE ACONDICIONADO PHILCO 5000W FC PHS50H13X',9099.00, '0779696242975', 7, 275,'2016-12-22', 1 ),
            (150,'AIRE ACONDICIONADO PORTATIL DURABRAND 2500FS LGACD01',4999.00, '0073621119267', 7, 995,'2017-01-26', 1 ),
            (151,'AIRE ACONDICIONADO SAMSUNG 3000FC AR12FQFTAUR',7949.00, '0880608575497', 7, 34,'2017-01-03', 1 ),
            (152,'AIRE ACONDICIONADO SANYO 2600W FC KC913HSAN',6099.00, '0779696244956', 7, 372,'2017-01-23', 1 ),
            (153,'AIRE ACONDICIONADO SANYO 3200W FC KC1213HSAN',6899.00, '0779696242957', 7, 260,'2017-02-02', 1 ),
            (154,'AIRE ACONDICIONADO SURREYPRIA 2250FC 553EPQ0913F',6929.00, '0779708708630', 7, 38,'2016-12-30', 1 ),
            (155,'AIRE ACONDICIONADO SURREYPRIA 3000FC 553EPQ1213F',7949.00, '0779708708631', 7, 180,'2017-01-04', 1 ),
            (156,'AIRE ACONDICIONADO SURREYPRIA 4500FC 553EPQ1813F',11849.00, '0779708708632', 7, 232,'2017-01-07', 1 ),
            (157,'AIRE ACONDICIONADO SURREYPRIA 5500FC 553EPQ2213F',14329.00, '0779708708633', 7, 909,'2017-01-10', 1 ),
            (158,'CALEFACTOR SIN SALIDA 4000 KCAL VOLCAN',1159.00, '0779703781219', 7, 598,'2016-12-23', 1 ),
            (159,'CALEFACTOR SIN SALIDA ORBIS 4200 KCAL',1469.00, '0779703781123', 7, 504,'2017-01-11', 0 ),
            (160,'ESTUFA ORBIS TIRO BALANCEADO 5000 K',2019.00, '0779703781129', 7, 600,'2017-01-17', 1 ),
            (161,'ESTUFA VOLCAN TIRO BALANCEADO 2000 KCAL 42312V',1439.00, '0779703781220', 7, 602,'2016-12-28', 1 ),
            (162,'ESTUFA VOLCAN TIRO BALANCEADO NEGRO 3800 43712V',1679.00, '0779703781221', 7, 650,'2017-02-04', 1 ),
            (163,'TIRO BALANCEADO 3500 KCAL EMEGE',1605.00, '0779135400180', 7, 474,'2017-01-29', 1 ),
            (164,'CALEFACTOR ELECTRICO CLEVER VIDRIO H1107',1950.00, '0779815957117', 7, 459,'2016-12-29', 1 ),
            (165,'CALEFACTOR ELECTRICO CONVECCION CON-1800',1599.00, '0779814958212', 7, 10,'2017-01-13', 1 ),
            (166,'CALEFACTOR ELECTRICO CONVECCION CON-2000N',790.00, '0779815957180', 7, 112,'2017-01-11', 1 ),
            (167,'CALEFACTOR ELECTRICO CONVECCION CON-2000R',790.00, '0779815957181', 7, 141,'2017-01-26', 1 ),
            (168,'CALEFACTOR LILIANA INFRARROJO CI062',345.00, '0779386200687', 7, 516,'2016-12-27', 1 ),
            (169,'CALEFACTOR PANEL 500 WATTS',769.00, '0779813482002', 7, 804,'2017-01-03', 1 ),
            (170,'CALOVENTOR 2000 W AXEL AX-CA100',249.00, '0779811896139', 7, 780,'2017-01-10', 1 ),
            (171,'CALOVENTOR DE PARED 2000 W KENBROWN',839.00, '0779811320136', 7, 737,'2016-12-28', 1 ),
            (172,'CALOVENTOR DE PARED PROTALIA CP200A',799.00, '0779811559131', 7, 833,'2017-01-30', 1 ),
            (173,'CALOVENTOR ELECTRICO BLANCO 1500W LE1500B',599.00, '0779815957245', 7, 492,'2017-01-04', 1 ),
            (174,'CALOVENTOR ELECTRICO LE1500ROJO',599.00, '0779815957247', 7, 437,'2017-01-29', 1 ),
            (175,'CALOVENTOR ELECTRICO NEGRO 1500W LE1500N',599.00, '0779815957246', 7, 875,'2017-01-09', 1 ),
            (176,'CALOVENTOR ELECTROLUX SPLIT CONTROL REMOTO',999.00, '0779386200613', 7, 675,'2016-12-20', 1 ),
            (177,'CALOVENTOR KEN BROWN 2000 W',319.00, '0779811320075', 7, 76,'2017-01-23', 1 ),
            (178,'CALOVENTOR RESISTENCIA CERAMICA',319.00, '0557306319076', 7, 243,'2017-01-08', 1 ),
            (179,'CIRCULADOR DE AIRE FRIO CALOR DURABRAND',1049.00, '0073621119287', 7, 121,'2017-01-30', 1 ),
            (180,'CONVECTOR AXEL 2000 W AX-COT100',689.00, '0779811896141', 7, 357,'2016-12-24', 1 ),
            (181,'CONVECTOR AXEL 2000 W CON TURBO AX-COT',609.00, '0779811896131', 7, 246,'2017-01-16', 1 ),
            (182,'CONVECTOR CLEVER CLEVERBLANCO CON2000B',790.00, '0779815957179', 7, 229,'2017-01-09', 1 ),
            (183,'CONVECTOR TELEFUNKEN 2000 WATT C1009',479.00, '0779724533114', 7, 642,'2016-12-29', 1 ),
            (184,'ESTUFA ELECTROLUX HALOGENAS HAL18G',549.00, '0779386200254', 7, 295,'2017-01-15', 1 ),
            (185,'ESTUFA ELECTRICA KEN BROWN 2 VELAS 800 KB 22',245.00, '0779811320288', 7, 598,'2016-12-24', 1 ),
            (186,'ESTUFA HALOGENA 3 VELAS KEN BROWN',409.00, '0779811320134', 7, 580,'2016-12-24', 1 ),
            (187,'ESTUFA HALOGENA 4 VELAS KEN BROWN',449.00, '0779811320135', 7, 741,'2017-01-28', 1 ),
            (188,'ESTUFA HALOGENA ELECTROLUX 1600W SIN OSCILACION HAL18A',499.00, '0779386200253', 7, 632,'2016-12-23', 1 ),
            (189,'ESTUFA HALOGENA MAGIC 1200 W C1007',189.00, '0779724533112', 7, 518,'2016-12-26', 1 ),
            (190,'PANEL 1000W ATMA',99999.00, '0779696280631', 7, 951,'2017-01-17', 1 ),
            (191,'PANEL 2000 W NEGRO ENERGY SAVE',1499.00, '0779814951036', 7, 647,'2016-12-20', 1 ),
            (192,'PANEL 500 W ECOSOL',1119.00, '0779813482029', 7, 805,'2017-01-18', 1 ),
            (193,'PANEL 900W ECOSOL 1-502',1869.00, '0779813482031', 7, 726,'2017-02-01', 1 ),
            (194,'PANEL MICA ELECTROLUX RMIC15',999.00, '0779386200256', 7, 331,'2016-12-26', 1 ),
            (195,'PANEL PIETRA 500 W PEISA',699.00, '0779808116284', 7, 171,'2017-01-27', 1 ),
            (196,'RADIADOR DE MICA ELECTROLUX 1000W RALU01',699.00, '0779817317015', 7, 987,'2017-01-24', 1 ),
            (197,'TURBO CALENTADOR 2000W TCAL2000',590.00, '0779815957248', 7, 539,'2017-01-03', 1 ),
            (198,'VENTILADOR DE PIE DURABRAND 18" VP21',122.00, '0779797170650', 7, 318,'2017-01-31', 1 ),
            (199,'CAMARA DIGITAL C1433 SLVER GE',899.00, '0084695100018', 6, 528,'2017-02-02', 1 ),
            (200,'LIMPIADOR CD SV 8336 ONE FOR ALL',55.00, '0871618404342', 1, 508,'2016-12-27', 1 ),
            (201,'LIMPIADOR LCD SV 8410 ONE FOR ALL',102.00, '0871618404333', 1, 186,'2017-02-02', 1 )
            ;`
          );
        }

        // cerrar la base
        db.close();
      }
      
    CrearBaseSiNoExiste();
      
    module.exports =  CrearBaseSiNoExiste;

// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db");

// definicion del modelo de datos
const articulosfamilias = sequelize.define(
  "articulosfamilias",
  {
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
        beforeValidate: function (articulofamilia, options) {
            if (typeof articulofamilia.Nombre === "string") {
              articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase().trim();
            }
          },
        },
    
        timestamps: false,
      }
    );
    
    const articulos = sequelize.define(
      "articulos",
      {
        IdArticulo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Nombre: {
          type: DataTypes.STRING(60),
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: "Nombre es requerido",
            },
            len: {
              args: [5, 60],
              msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
            },
          },
          unique: {
            args: true,
            msg: "este Nombre ya existe en la tabla!",
          },
        },
        Precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Precio es requerido",
              }
            }
          },
          CodigoDeBarra: {
            type: DataTypes.STRING(13),
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Codigo De Barra es requerido",
              },
              is: {
                args: ["^[0-9]{13}$", "i"],
                msg: "Codigo de Barra debe ser numérico de 13 digitos",
              },
            },
          },
          IdArticuloFamilia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "IdArticuloFamilia es requerido",
              }
            }
          },
          Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Stock es requerido",
              }
            }
          },
          FechaAlta: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Fecha Alta es requerido",
              }
            }
          },
          Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
              notNull: {
                args: true,
                msg: "Activo es requerido",
              }
            }
          },
        },
        {
          // pasar a mayusculas
          hooks: {
            beforeValidate: function (articulo, options) {
              if (typeof articulo.Nombre === "string") {
                articulo.Nombre = articulo.Nombre.toUpperCase().trim();
              }
            },
          },
      
          timestamps: false,
        }
        );

        module.exports = {
          sequelize,
          articulosfamilias,
          articulos,
        };
                        
