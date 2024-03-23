"use client"
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const fetchUsers = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=10`);
    const data = await response.json();
    return data;
};

const InfiniteUsers = () => {
    const [shouldFetch, setShouldFetch] = useState(false);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(['users'], fetchUsers, {
        enabled: shouldFetch,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.info.page < lastPage.info.results) {
                return pages.length + 1;
            } else {
                return undefined;
            }
        },
    });

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'error') {
        return <div>Error fetching data</div>;
    }

    return (
        <div>
            {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page.results.map((user) => (
                        <div key={user.login.uuid}>
                            <img src={user.picture.thumbnail} alt={user.name.first} />
                            <p>
                                {user.name.first} {user.name.last}
                            </p>
                        </div>
                    ))}
                </React.Fragment>
            ))}
            {!shouldFetch && <button onClick={() => setShouldFetch(true)}>Start Fetching</button>}
            {shouldFetch && (
                <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                </button>
            )}
        </div>
    );
};

export default InfiniteUsers;