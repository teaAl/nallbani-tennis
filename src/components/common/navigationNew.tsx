'use client';

import { useEffect, useState } from "react";
import logonb from "../../public/images/logo-nt.png";
import Image from "next/image";
import Link from "next/link";

const NavigationNew = () => {
    const [user, setUser] = useState<"admin" | "member" | "guest" | null>(null);

    useEffect(() => {
        setUser("admin");
    }, [user]);

    return (
        <div>
            <Image src={logonb} width={70} height={70} alt="" />
        </div>
    )
};

export default NavigationNew;