
function NotFound() {
    return (  <>
    <div className="container text-center mt-20">
    <h1 className="text-6xl mb-5">404</h1>
    <h2 className="text-3xl text-gray-500 mb-3">File not found</h2>
       <p className="w-[80%] mx-auto nb-3 text-gray-500">
The site configured at this address does not contain the requested file.</p>
<p className="mb-3 text-gray-500">If this is your site, make sure that the filename case matches the URL as well as any file permissions.</p>
<p className="mb-3 text-gray-500">For root you must provide an index.html file.</p>
<p className="mb-3 text-gray-500">Read the full documentation for more information about using GitHub Pages.</p> 
    </div>
    </>);
}

export default NotFound;