import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

import { ReactComponent as Home } from "../assets/images/home/home_button.svg";
import { ReactComponent as Phonebook } from "../assets/images/home/phonebook_button.svg";
import { ReactComponent as Setting } from "../assets/images/home/setting_button.svg";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Sign Out",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <Home stroke="white" />,
    title: "Home",
  },
  {
    index: 1,
    icon: <Phonebook fill="white" />,
    title: "Phonebook",
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <Setting />,
    title: "Setting",
  },
];

const CallList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: false,
    missed: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: true,
    missed: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 8,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 9,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 10,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
  {
    id: 11,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: false,
    incoming: false,
    missed: false,
  },
  {
    id: 12,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    online: true,
    incoming: true,
    missed: false,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: "Chau",
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
    chat_type: "individual",
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: "Quan",
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
    chat_type: "individual",
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
    chat_type: "individual",
  },
  {
    id: 3,
    img: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
    ],
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
    chat_type: "group",
    name: "Group A",
    admin: "AD",
  },
  {
    id: 4,
    img: [faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
    chat_type: "group",
    name: "Group B",
    admin: "AD",
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
    chat_type: "individual",
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
    chat_type: "individual",
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.person.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
    chat_type: "individual",
  },
];

const Chat_History = [
  {
    type: "msg",
    subtype: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: "true",
    outgoing: "false",
  },
  {
    type: "divider",
    subtype: undefined,
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.url(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const Shared_docs = [
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    title: "Yes sure, here you go.",
    size: 120,
    outgoing: false,
  },
];

const Shared_links = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.url(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
];

const MembersList = [
  {
    id: 0,
    name: "AD",
    online: true,
  },
  {
    id: 1,
    name: faker.person.firstName(),
    online: false,
  },
  {
    id: 2,
    name: "name",
    online: true,
  },
];

const UsersList = [
  { id: 1, name: "John", email: "john@gmail.com", img: faker.image.avatar(), online: false },
  { id: 2, name: "Mary", email: "mary@gmail.com", img: faker.image.avatar(), online: true },
  { id: 3, name: "oon", email: "johnfarn@gmail.com", img: faker.image.avatar(), online: false },
];

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  Shared_links,
  Shared_docs,
  CallList,
  MembersList,
  UsersList
};
