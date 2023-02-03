import CompanyIcon from '../public/icons/company.svg';
import LocationIcon from '../public/icons/location.svg';
import FollowersIcon from '../public/icons/followers.svg';
import FollowingIcon from '../public/icons/following.svg';
import ReposIcon from '../public/icons/repos.svg';
import GistsIcon from '../public/icons/gists.svg';
import WebsiteIcon from '../public/icons/website.svg';
import EmailIcon from '../public/icons/email.svg';
import TwitterIcon from '../public/icons/twitter.svg';
import GithubIcon from '../public/icons/github.svg';
import LinkIcon from '../public/icons/link.svg';
import WatchersIcon from '../public/icons/watchers.svg';
import ForksIcon from '../public/icons/forks.svg';
import StarsIcon from '../public/icons/stars.svg';
import Info from '../components/info';
import { getFollowers, getFollowing, getRepos, getUser } from '../lib/api';
import { RepoType, UserSearchType, UserType } from '../lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { getCount } from '../lib/helpers';
import Chart from 'react-google-charts';

interface GetServerSidePropsTypes {
  params: { slug: string[] };
}

export async function getServerSideProps(context: GetServerSidePropsTypes) {
  const login = context.params.slug[2];
  const [user, followers, following, repos] = await Promise.all([
    getUser(login),
    getFollowers(login),
    getFollowing(login),
    getRepos(login),
  ]);
  return { props: { user, followers, following, repos } };
}

interface UserPropTypes {
  user: UserType;
  followers: UserSearchType[];
  following: UserSearchType[];
  repos: RepoType[];
}

export default function User({
  user,
  followers,
  following,
  repos,
}: UserPropTypes) {
  const colors = ['#0891B2', '#059669', '#E11D48', '#EA580C', '#7C3AED'];
  const langs = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language])
      total[language] = { label: language, value: 1, stars: stargazers_count };
    else
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    return total;
  }, {} as any);
  const mostUsedLangs: any = Object.values(langs)
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 5)
    .map(({ label, value }: any, index) => [label, value, colors[index]]);
  mostUsedLangs.unshift(['Language', 'Value', { role: 'style' }]);
  const mostPopularLangs: any = Object.values(langs)
    .sort((a: any, b: any) => b.stars - a.stars)
    .slice(0, 5)
    .map(({ label, stars }: any, index) => [label, stars, colors[index]]);
  mostPopularLangs.unshift(['Language', 'Stars', { role: 'style' }]);
  const forks: any = repos
    .sort((a, b) => b.forks_count - a.forks_count)
    .slice(0, 5)
    .map(({ name, forks_count }, index) => [name, forks_count, colors[index]]);
  forks.unshift(['Repo', 'Forks', { role: 'style' }]);
  const stars: any = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(({ name, stargazers_count }, index) => [
      name,
      stargazers_count,
      colors[index],
    ]);
  stars.unshift(['Repo', 'Stars', { role: 'style' }]);
  console.log(mostUsedLangs);

  return (
    <div className="flex flex-col gap-5 items-center justify-center  py-24 px-2">
      <div className="bg-red-500 bg-amber-500 bg-emerald-500 bg-cyan-500 bg-violet-500"></div>
      <div className="w-full max-w-5xl gap-1 flex flex-col lg:grid lg:grid-cols-3 lg:gap-3">
        <div className="w-full flex flex-col gap-3 self-start lg:col-span-2">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-blue-900 font-semibold text-2xl sm:text-3xl">
              {user.name}
            </h1>
            <p className="text-blue-800 text-sm sm:text-base">{user.bio}</p>
          </div>

          <div className="w-full grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
            {user.company && (
              <Info
                Icon={CompanyIcon}
                value={user.company}
                text="Company"
                bgColor="bg-pink-300"
                textColor="text-pink-700"
                labelColor="text-pink-900"
                fillColor="fill-pink-900"
              />
            )}
            {user.location && (
              <Info
                Icon={LocationIcon}
                value={user.location}
                text="Location"
                bgColor="bg-purple-300"
                textColor="text-purple-700"
                labelColor="text-purple-900"
                fillColor="fill-purple-900"
              />
            )}
            <Info
              Icon={FollowersIcon}
              value={user.followers}
              text="Followers"
              bgColor="bg-indigo-300"
              textColor="text-indigo-700"
              labelColor="text-indigo-900"
              fillColor="fill-indigo-900"
            />
            <Info
              Icon={FollowingIcon}
              value={user.following}
              text="Following"
              bgColor="bg-sky-300"
              textColor="text-sky-700"
              labelColor="text-sky-900"
              fillColor="fill-sky-900"
            />
            <Info
              Icon={ReposIcon}
              value={user.public_repos}
              text="Repos"
              bgColor="bg-teal-300"
              textColor="text-teal-700"
              labelColor="text-teal-900"
              fillColor="fill-teal-900"
            />
            <Info
              Icon={GistsIcon}
              value={user.public_gists}
              text="Gists"
              bgColor="bg-green-300"
              textColor="text-green-700"
              labelColor="text-green-900"
              fillColor="fill-green-900"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-1 md:grid-cols-2 lg:flex lg:flex-col">
          {user.blog && (
            <Info
              Icon={WebsiteIcon}
              value={`${
                user.blog.includes('http')
                  ? user.blog.split('//')[1]
                  : user.blog
              }`}
              url={`${
                user.blog.includes('http') ? user.blog : `https://${user.blog}`
              }`}
              text="Website"
              bgColor="bg-yellow-300"
              textColor="text-yellow-700"
              labelColor="text-yellow-900"
              fillColor="fill-yellow-900"
            />
          )}
          {user.email && (
            <Info
              Icon={EmailIcon}
              value={user.email}
              url={`mailto:${user.email}`}
              text="Email"
              bgColor="bg-orange-300"
              textColor="text-orange-700"
              labelColor="text-orange-900"
              fillColor="fill-orange-900"
            />
          )}
          {user.twitter_username && (
            <Info
              Icon={TwitterIcon}
              value={`twitter/${user.twitter_username}`}
              url={`https://twitter.com/${user.twitter_username}`}
              text="Twitter"
              bgColor="bg-red-300"
              textColor="text-red-700"
              labelColor="text-red-900"
              fillColor="fill-red-900"
            />
          )}
          {user.html_url && (
            <Info
              Icon={GithubIcon}
              value={`github/${user.login}`}
              url={user.html_url}
              text="Github"
              bgColor="bg-stone-300"
              textColor="text-stone-700"
              labelColor="text-stone-900"
              fillColor="fill-stone-900"
            />
          )}
        </div>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-3 md:flex-row">
        {followers.length > 0 && (
          <div className="w-full flex flex-col">
            <p className="p-2 bg-white max-w-max text-blue-900 font-semibold text-sm sm:text-base">
              Top Followers
            </p>
            <div className="w-full flex flex-col gap-3 bg-white p-3 h-[500px] overflow-y-scroll  ">
              {followers.map((f) => (
                <div key={f.id} className="flex gap-2">
                  <Image
                    className="rounded-full"
                    width={50}
                    height={50}
                    src={f.avatar_url}
                    alt={f.login}
                  />
                  <div className="flex flex-col">
                    <Link
                      className="flex gap-1 items-center text-sm sm:text-base font-semibold text-blue-900"
                      href={`/user/${f.id}/${f.login}`}
                    >
                      {f.login}
                      <div className="w-4 h-auto fill-blue-900 translate-y-0.5">
                        <LinkIcon />
                      </div>
                    </Link>
                    <Link
                      className="text-xs sm:text-sm font-medium text-blue-800"
                      href={f.html_url}
                    >
                      {f.html_url}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {following.length > 0 && (
          <div className="w-full flex flex-col ">
            <p className="p-2 bg-white max-w-max text-blue-900 font-semibold text-sm sm:text-base">
              Top Following
            </p>
            <div className="w-full flex flex-col gap-3 bg-white p-3 h-[500px] overflow-y-scroll">
              {following.map((f) => (
                <div key={f.id} className="flex gap-2">
                  <Image
                    className="rounded-full"
                    width={50}
                    height={50}
                    src={f.avatar_url}
                    alt={f.login}
                  />
                  <div className="flex flex-col">
                    <Link
                      className="flex gap-1 items-center text-sm sm:text-base font-semibold text-blue-900"
                      href={`/user/${f.id}/${f.login}`}
                    >
                      {f.login}
                      <div className="w-4 h-auto fill-blue-900 translate-y-0.5">
                        <LinkIcon />
                      </div>
                    </Link>
                    <Link
                      className="text-xs sm:text-sm font-medium text-blue-800"
                      href={f.html_url}
                    >
                      {f.html_url}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-1">
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={forks}
          options={{
            title: 'Most Forked Repos',
            bar: { groupWidth: '80%' },
            legend: { position: 'none' },
          }}
        />
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={stars}
          options={{
            title: 'Most Popular Repos',
            bar: { groupWidth: '80%' },
            legend: { position: 'none' },
          }}
        />
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={mostUsedLangs}
          options={{
            title: 'Most Used Languages',
            slices: {
              0: { color: colors[0] },
              1: { color: colors[1] },
              2: { color: colors[2] },
              3: { color: colors[3] },
              4: { color: colors[4] },
            },
          }}
        />
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={mostPopularLangs}
          options={{
            title: 'Most Popular Languages',
            slices: {
              0: { color: colors[0] },
              1: { color: colors[1] },
              2: { color: colors[2] },
              3: { color: colors[3] },
              4: { color: colors[4] },
            },
          }}
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-3 ">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className="w-full flex flex-col gap-2 bg-white p-3 rounded"
          >
            <div className="flex flex-col gap-1">
              <Link
                href={repo.html_url}
                className="flex items-center gap-1 text-sm sm:text-base font-semibold text-blue-900"
              >
                {repo.name}
                <div className="w-4 h-auto fill-blue-900 translate-y-0.5">
                  <LinkIcon />
                </div>
              </Link>
              <p className="text-xs sm:text-sm font-medium text-blue-800">
                {repo.description}
              </p>
            </div>
            <div className="flex gap-1">
              <div
                className="py-0.5 px-3 rounded-full bg-yellow-300 flex items-center gap-1.5 "
                title="forks"
              >
                <div className="w-3 h-auto fill-yellow-900 ">
                  <ForksIcon />
                </div>
                <p className="text-xs sm:text-sm font-medium text-yellow-900">
                  {repo.forks_count}
                </p>
              </div>

              <div
                className="py-0.5 px-3 rounded-full bg-green-300 flex items-center gap-1.5 "
                title="stars"
              >
                <div className="w-3 h-auto fill-green-900 ">
                  <StarsIcon />
                </div>
                <p className="text-xs sm:text-sm font-medium text-green-900">
                  {repo.stargazers_count}
                </p>
              </div>

              <div
                className="py-0.5 px-3 rounded-full bg-red-300 flex items-center gap-1.5 "
                title="watchers"
              >
                <div className="w-3 h-auto fill-red-900 ">
                  <WatchersIcon />
                </div>
                <p className="text-xs sm:text-sm font-medium text-red-900">
                  {repo.watchers_count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
