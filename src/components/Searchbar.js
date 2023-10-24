function Searchbar(props) {
    const { label, onSearch } = props

    let searchVal = (e) => {
        onSearch(e);
    }

    return <>
        <div>
            <div>
                <input onChange={(e) => searchVal(e.target.value)}
                    placeholder={label ?? 'Search...'} style={{ width: '600px' }} />
            </div>
        </div>
    </>
}

export default Searchbar;