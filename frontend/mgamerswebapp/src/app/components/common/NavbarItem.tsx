type NavbarItemProps = {
  isActive: boolean;
  name: string;
  hrefString: string;
};

export default function NavbarItem({ isActive, name, hrefString }: NavbarItemProps) : JSX.Element {


    return (
        <>
            {isActive == true ?
                <a className="nav-link clicked text-secondary-200 font-semibold border-secondary-200 border-b-2" href={hrefString} key={name}>
                    {name}
                </a>
                :
                <a className="nav-link after:bg-secondary-200 hover:text-secondary-200 text-gray-300 font-semibold" href={hrefString} key={name}>
                    {name}
                </a>
            }
        </>

    );
}