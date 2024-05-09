<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{

    #[Route("/upload-image", methods: ['POST'])]
    public function uploadImage(Request $request): Response
    {
        $uploadedFile = $request->files->get('image');

        if (!$uploadedFile) {
            return new Response('No image uploaded', Response::HTTP_BAD_REQUEST);
        }

        $destination = $this->getParameter('images_directory'); // Chemin où vous souhaitez sauvegarder les images

        try {
            $uploadedFile->move($destination, $uploadedFile->getClientOriginalName());
            return new Response('Image uploaded successfully', Response::HTTP_OK);
        } catch (\Exception $e) {
            return new Response('Failed to upload image', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
