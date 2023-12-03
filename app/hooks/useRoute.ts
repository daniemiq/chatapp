import { useMemo } from "react";

import { useParams } from "next/navigation";

import {HiChat} from 'react-icons/hi'

import {
    HiArrowLeftOnRectangle,
    HiUsers
} from 'react-icons/hi2'

import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = useParams()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            //@ts-ignore
            active: pathname === '/conversations' || !!conversationId
        },
        {

        }
    ], [pathname, conversationId])
}