import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';
import { Card } from '../Card';

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

  const handleCloseModal = (): void => {
    onClose();
  };

  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (

    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent
        mx="auto"
        w="auto"
        h="auto"
        maxW={['300px', '500px', '900px']}
        maxh={['350px', '450px', '600px']}
      >
        <ModalBody p={0}>
          <Image
            src={imgUrl}
            maxW={['300px', '500px', '900px']}
            maxh={['350px', '450px', '600px']}
            objectFit="cover"
          />
        </ModalBody>
        <ModalFooter bgColor="pGray.800" h="2rem" py="20px" borderBottomRadius="5px">
          <Link href={imgUrl} isExternal fontSize="1rem" mr="auto">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
