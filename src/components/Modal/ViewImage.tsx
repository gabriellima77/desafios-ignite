import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="fit-content"
        maxW="none"
        alignSelf="center"
        bg="gray.800"
      >
        <ModalBody w="fit-content" p="0">
          <Image src={imgUrl} objectFit="cover" maxW="900px" maxH="600px" />
        </ModalBody>
        <ModalFooter
          w="100%"
          borderRadius="0px 0px 6px 6px"
          justifyContent="flex-start"
        >
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
