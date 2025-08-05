export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <>
            <div className="w-full text-center py-16">
                <h1 className="text-violet-100">
                    &copy; {currentYear} Drew Larson. All Rights Reserved.
                </h1>
            </div>
        </>
    )
}
