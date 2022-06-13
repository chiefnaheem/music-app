import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  ListItem,
  Divider,
  List,
  ListIcon,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavourite } from "react-icons/md";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    link: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    link: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    link: "/library",
  },
];

const SideBar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh-100px)"
      backgroundColor="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/preview.jpeg" width={120} height={60} />
        </Box>
        <Box width="100%" marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((item, index) => (
              <ListItem key={index} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={item.link} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" marginRight="20px" />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
