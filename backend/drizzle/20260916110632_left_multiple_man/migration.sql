CREATE TABLE `role` (
	`id_role` int AUTO_INCREMENT PRIMARY KEY,
	`statuUser` enum('admin','User'),
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `classe` (
	`id_classe` int AUTO_INCREMENT PRIMARY KEY,
	`niveau` varchar(30) NOT NULL,
	`cycle` varchar(20),
	`sous_section` enum('Anglophone','Francophone'),
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `niveau_unique` UNIQUE INDEX(`niveau`)
);
--> statement-breakpoint
CREATE TABLE `eleve` (
	`id_ele` int AUTO_INCREMENT PRIMARY KEY,
	`matricule` varchar(20) NOT NULL,
	`nom` varchar(255) NOT NULL,
	`prenom` varchar(255),
	`date_naiss` date NOT NULL,
	`lieu_naiss` varchar(255) NOT NULL,
	`sexe` enum('M','F') NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `matricule_unique` UNIQUE INDEX(`matricule`)
);
--> statement-breakpoint
CREATE TABLE `elevesalle` (
	`id_salle` int,
	`id_ele` int,
	`annee` int NOT NULL,
	CONSTRAINT PRIMARY KEY(`id_ele`,`id_salle`)
);
--> statement-breakpoint
CREATE TABLE `matiere` (
	`id_matiere` int AUTO_INCREMENT PRIMARY KEY,
	`intitule` varchar(255),
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `matieresalle` (
	`id_matiere` int,
	`id_salle` int,
	`coef` int NOT NULL,
	`annee` int NOT NULL,
	CONSTRAINT PRIMARY KEY(`id_matiere`,`id_salle`)
);
--> statement-breakpoint
CREATE TABLE `note` (
	`id_note` int AUTO_INCREMENT PRIMARY KEY,
	`valeur` float NOT NULL,
	`sequence` int NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	`anneeScolaire` varchar(10),
	`coef` int NOT NULL DEFAULT 1,
	`id_matiere` int,
	`id_ele` int
);
--> statement-breakpoint
CREATE TABLE `salles` (
	`id_salle` int AUTO_INCREMENT PRIMARY KEY,
	`nom_salle` varchar(20) NOT NULL,
	`effectif` int NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	`id_classe` int,
	`id_serie` int,
	CONSTRAINT `nom_salle_unique` UNIQUE INDEX(`nom_salle`)
);
--> statement-breakpoint
CREATE TABLE `serie` (
	`id_serie` int AUTO_INCREMENT PRIMARY KEY,
	`intitule` varchar(20) NOT NULL,
	`code` varchar(20) NOT NULL,
	`cree_le` timestamp NOT NULL DEFAULT (now()),
	`mod_le` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `code_unique` UNIQUE INDEX(`code`)
);
--> statement-breakpoint
CREATE TABLE `serieclasse` (
	`id_serie` int,
	`id_classe` int,
	`annee` int NOT NULL,
	CONSTRAINT PRIMARY KEY(`id_serie`,`id_classe`)
);
--> statement-breakpoint
CREATE TABLE `usermatiere` (
	`int_ur` int,
	`id_matiere` int,
	`annee` int NOT NULL,
	CONSTRAINT PRIMARY KEY(`id_matiere`,`int_ur`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id_ur` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`specialite` varchar(255) NOT NULL,
	`tel` varchar(25) NOT NULL,
	`password` varchar(255) NOT NULL,
	`id_role` int,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`),
	CONSTRAINT `tel_unique` UNIQUE INDEX(`tel`)
);
--> statement-breakpoint
CREATE TABLE `usersalle` (
	`int_ur` int,
	`id_salle` int,
	`annee` int NOT NULL,
	`titulaire` boolean NOT NULL,
	CONSTRAINT PRIMARY KEY(`id_salle`,`int_ur`)
);
--> statement-breakpoint
ALTER TABLE `elevesalle` ADD CONSTRAINT `elevesalle_id_salle_salles_id_salle_fkey` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `elevesalle` ADD CONSTRAINT `elevesalle_id_ele_eleve_id_ele_fkey` FOREIGN KEY (`id_ele`) REFERENCES `eleve`(`id_ele`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `matieresalle` ADD CONSTRAINT `matieresalle_id_matiere_matiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `matieresalle` ADD CONSTRAINT `matieresalle_id_salle_salles_id_salle_fkey` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_id_matiere_matiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `note` ADD CONSTRAINT `note_id_ele_eleve_id_ele_fkey` FOREIGN KEY (`id_ele`) REFERENCES `eleve`(`id_ele`) ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `salles` ADD CONSTRAINT `salles_id_classe_classe_id_classe_fkey` FOREIGN KEY (`id_classe`) REFERENCES `classe`(`id_classe`);--> statement-breakpoint
ALTER TABLE `salles` ADD CONSTRAINT `salles_id_serie_serie_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `serie`(`id_serie`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `serieclasse` ADD CONSTRAINT `serieclasse_id_serie_serie_id_serie_fkey` FOREIGN KEY (`id_serie`) REFERENCES `serie`(`id_serie`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `serieclasse` ADD CONSTRAINT `serieclasse_id_classe_classe_id_classe_fkey` FOREIGN KEY (`id_classe`) REFERENCES `classe`(`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `usermatiere` ADD CONSTRAINT `usermatiere_int_ur_users_id_ur_fkey` FOREIGN KEY (`int_ur`) REFERENCES `users`(`id_ur`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `usermatiere` ADD CONSTRAINT `usermatiere_id_matiere_matiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `matiere`(`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_role_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id_role`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `usersalle` ADD CONSTRAINT `usersalle_int_ur_users_id_ur_fkey` FOREIGN KEY (`int_ur`) REFERENCES `users`(`id_ur`) ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE `usersalle` ADD CONSTRAINT `usersalle_id_salle_salles_id_salle_fkey` FOREIGN KEY (`id_salle`) REFERENCES `salles`(`id_salle`) ON DELETE CASCADE ON UPDATE CASCADE;