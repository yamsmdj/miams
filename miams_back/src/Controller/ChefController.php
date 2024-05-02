<?php

namespace App\Controller;


use App\Entity\Chef;
use App\Service\ChefService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/chef')]
class ChefController extends AbstractController
{
    private SerializerInterface $serializer;
    private ChefService $chefService;

    public function __construct(ChefService $chefService, SerializerInterface $serializer)
    {
        $this->chefService = $chefService;
        $this->serializer = $serializer;
    }

    #[Route('/', methods: ['GET'])]
    public function getAll(): Response
    {
        $chef = $this->chefService->getAll();
        $data = $this->serializer->serialize($chef, 'json', ['groups' => 'getChef']);
        return new Response($data);
    }
    #[Route('/{id}')]
    public function get($id): Response
    {
        $chef = $this->chefService->get($id);
        $data = $this->serializer->serialize($chef, 'json', ['groups' => 'getChef']);
        return new Response($data);
    }

    #[Route('/', methods: ['POST'])]
    public function create(#[MapRequestPayload()] Chef $chef): Response
    {
        $chef = $this->chefService->create($chef);
        $data = $this->serializer->serialize($chef, 'json');
        return new Response($data);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function put(Chef $newChef, $id): Response
    {
        $chef = $this->chefService->update($newChef, $id);
        return new Response($chef);
    }

    #[Route('/{id}', methods:['DELETE'])]
    public function remove(Chef $chef): Response
    {
        try {
            $this->chefService->remove($chef);
            return new Response("Le chef" .  $chef->getName() . "a bien été supprimé", Response::HTTP_OK);
        }catch (Exception $e){
            return new response ($e->getMessage(), Response::HTTP_NOT_FOUND);
        }
    }


}
