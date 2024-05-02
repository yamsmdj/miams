<?php

namespace App\Controller;


use App\Entity\Recette;
use App\Service\RecetteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/recette')]
class RecetteController extends AbstractController
{
    private SerializerInterface $serializer;
    private RecetteService $recetteService;

    public function __construct(RecetteService $recetteService, SerializerInterface $serializer)
    {
        $this->recetteService = $recetteService;
        $this->serializer = $serializer;
    }

    #[Route('/', methods: ['GET'])]
    public function getAll(): Response
    {
        return new Response($this->serializer->serialize($this->recetteService->getAll(), 'json', ['groups' => 'getRecette']));

    }
    #[Route('/{id}', methods:['GET'])]
    public function get($id): Response
    {
        $recette = $this->recetteService->get($id);
        $data = $this->serializer->serialize($recette, 'json', ['groups' => 'getRecette']);
        return new Response($data);
    }

    #[Route('/', methods: ['POST'])]
    public function create(#[MapRequestPayload()] Recette $recette): Response
    {
        $recette = $this->recetteService->create($recette);
        $data = $this->serializer->serialize($recette, 'json', ['groups' => 'getRecette']);
        return new Response($data);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function put(#[MapRequestPayload()] Recette $newRecette, $id): Response
    {
        $recette = $this->recetteService->update($newRecette, $id);
        return new Response($recette);
    }

    #[Route('/{id}', methods: ['PATCH'])]
    public function patch(int $id, #[MapRequestPayload] Recette $recette): Response
    {
        $message = $this->recetteService->patch($id, $recette);
        return new Response($message);
    }


}
