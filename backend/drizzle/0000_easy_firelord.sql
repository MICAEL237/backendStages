CREATE TABLE `role` (
	`id_role` serial AUTO_INCREMENT NOT NULL,
	`statuUser` enum('admin','User'),
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `role_id_role` PRIMARY KEY(`id_role`)
);
--> statement-breakpoint
CREATE TABLE `classe` (
	`id_classe` serial AUTO_INCREMENT NOT NULL,
	`niveau` varchar(30) NOT NULL,
	`cycle` varchar(20),
	`sous_section` varchar(30) NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `classe_id_classe` PRIMARY KEY(`id_classe`)
);
--> statement-breakpoint
CREATE TABLE `eleve` (
	`id_ele` serial AUTO_INCREMENT NOT NULL,
	`matricule` varchar(20) NOT NULL,
	`nom` varchar(255) NOT NULL,
	`prenom` varchar(255),
	`date_naiss` date NOT NULL,
	`lieu_naiss` varchar(255) NOT NULL,
	`sexe` enum('M','F') NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `eleve_id_ele` PRIMARY KEY(`id_ele`),
	CONSTRAINT `eleve_matricule_unique` UNIQUE(`matricule`)
);
--> statement-breakpoint
CREATE TABLE `elevesalle` (
	`id_salle` int NOT NULL,
	`id_ele` int NOT NULL,
	`annee` int NOT NULL,
	CONSTRAINT `cle_primaire` PRIMARY KEY(`id_ele`,`id_salle`)
);
--> statement-breakpoint
CREATE TABLE `matiere` (
	`id_matiere` serial AUTO_INCREMENT NOT NULL,
	`intitule` varchar(255),
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `matiere_id_matiere` PRIMARY KEY(`id_matiere`)
);
--> statement-breakpoint
CREATE TABLE `matieresalle` (
	`id_matiere` int NOT NULL,
	`id_salle` int NOT NULL,
	`coef` int NOT NULL,
	`annee` int NOT NULL,
	CONSTRAINT `cle_primaire` PRIMARY KEY(`id_matiere`,`id_salle`)
);
--> statement-breakpoint
CREATE TABLE `note` (
	`id_note` serial AUTO_INCREMENT NOT NULL,
	`valeur` float NOT NULL,
	`sequence` int NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	`anneeScolaire` varchar(10),
	`id_matiere` int,
	`id_ele` int,
	CONSTRAINT `note_id_note` PRIMARY KEY(`id_note`)
);
--> statement-breakpoint
CREATE TABLE `salles` (
	`id_salle` serial AUTO_INCREMENT NOT NULL,
	`nom_salle` varchar(20) NOT NULL,
	`effectif` int NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	`id_classe` int,
	`id_serie` int,
	CONSTRAINT `salles_id_salle` PRIMARY KEY(`id_salle`),
	CONSTRAINT `salles_nom_salle_unique` UNIQUE(`nom_salle`)
);
--> statement-breakpoint
CREATE TABLE `serie` (
	`id_serie` serial AUTO_INCREMENT NOT NULL,
	`intitule` varchar(20) NOT NULL,
	`code` varchar(20) NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `serie_id_serie` PRIMARY KEY(`id_serie`),
	CONSTRAINT `serie_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `usermatiere` (
	`int_ur` int NOT NULL,
	`id_matiere` int NOT NULL,
	`annee` int NOT NULL,
	CONSTRAINT `clePrimaire` PRIMARY KEY(`id_matiere`,`int_ur`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id_ur` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`specialite` varchar(255) NOT NULL,
	`tel` varchar(25) NOT NULL,
	`password` varchar(15),
	`id_role` int NOT NULL,
	CONSTRAINT `users_id_ur` PRIMARY KEY(`id_ur`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `username` (
	`int_ur` int NOT NULL,
	`id_salle` int NOT NULL,
	`annee` int NOT NULL,
	`titulaire` boolean NOT NULL,
	CONSTRAINT `preimary_key` PRIMARY KEY(`id_salle`,`int_ur`)
);
--> statement-breakpoint
ALTER TABLE `elevesalle` ADD CONSTRAINT `elevesalle_id_salle_salles_id_salle_fk` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `elevesalle` ADD CONSTRAINT `elevesalle_id_ele_eleve_id_ele_fk` FOREIGN KEY (`id_ele`) REFERENCES `eleve`(`id_ele`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matieresalle` ADD CONSTRAINT `matieresalle_id_matiere_matiere_id_matiere_fk` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matieresalle` ADD CONSTRAINT `matieresalle_id_salle_salles_id_salle_fk` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_id_matiere_matiere_id_matiere_fk` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_id_ele_eleve_id_ele_fk` FOREIGN KEY (`id_ele`) REFERENCES `eleve`(`id_ele`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salles` ADD CONSTRAINT `salles_id_classe_classe_id_classe_fk` FOREIGN KEY (`id_classe`) REFERENCES `classe`(`id_classe`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salles` ADD CONSTRAINT `salles_id_serie_serie_id_serie_fk` FOREIGN KEY (`id_serie`) REFERENCES `serie`(`id_serie`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usermatiere` ADD CONSTRAINT `usermatiere_int_ur_users_id_ur_fk` FOREIGN KEY (`int_ur`) REFERENCES `users`(`id_ur`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usermatiere` ADD CONSTRAINT `usermatiere_id_matiere_matiere_id_matiere_fk` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_role_id_role_fk` FOREIGN KEY (`id_role`) REFERENCES `role`(`id_role`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `username` ADD CONSTRAINT `username_int_ur_users_id_ur_fk` FOREIGN KEY (`int_ur`) REFERENCES `users`(`id_ur`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `username` ADD CONSTRAINT `username_id_salle_salles_id_salle_fk` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE no action ON UPDATE no action;