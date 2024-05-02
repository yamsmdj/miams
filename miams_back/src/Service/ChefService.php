<?php

namespace App\Service;

use App\Entity\Chef;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

class ChefService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getAll()
    {
        return $this->em->getRepository(Chef::class)->findAll();
    }

    public function get($id)
    {
        return $this->em->getRepository(Chef::class)->find($id);
    }

    public function create(Chef $chef)
    {
        $newChef = new Chef();
        $newChef->setName($chef->getName());
        $newChef->setDescription($chef->getDescription());

        $this->em->persist($newChef);
        $this->em->flush();
        return $newChef;
    }

    public function update(Chef $chef, $id): string
    {
        $existingChef = $this->em->getRepository(Chef::class)->find($id);
        if ($existingChef) {
            $existingChef
                ->setName($chef->getName() ?? $existingChef->getName())
                ->setDescription($chef->getDescription() ?? $existingChef->getDescription());

            $this->em->flush();
            return "Le chef possedant l'id {$id} a été mis a jour avec succès !";
        } else {
            return "Le chef avec l'id {$id} n'a pas pu se mettre a jour.";
        }
    }

    public function remove($chef): void
    {
        try {
            $this->em->remove($chef);
            $this->em->flush();
        } catch (Exception $e) {
            throw new Exception("Aucun chef n'a pu etre supprimer" . $e->getMessage());
        }
    }
}
