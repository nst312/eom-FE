/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import moment from 'moment';
import '../../globalCss/Template3style.css';

function Template3() {
  const userData = useSelector((state) => state.resumeApp.resume);

  const levelArr = (level) => {
    if (level === 20) return [1, 0, 0, 0, 0];
    if (level === 40) return [1, 2, 0, 0, 0];
    if (level === 60) return [1, 2, 3, 0, 0];
    if (level === 80) return [1, 2, 3, 4, 0];
    if (level === 100) return [1, 2, 3, 4, 5];
    return [];
  };

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="h-full w-full flex">
        <div className="w-1/3 h-auto flex flex-col justify-between">
          <div className="overflow-hidden">
            <div className="bg-[#3a5a87] rounded-full w-256 h-256 -ml-36 -mt-128" />
            <div className="-mt-80">
              <div className="items-center flex flex-col ">
                {(userData.personalDetails.firstName || userData.personalDetails.lastName) && (
                  <div className="text-white font-700 mb-2 text-18 break-all">
                    {userData.personalDetails.firstName} {userData.personalDetails.lastName}
                  </div>
                )}
                {userData.personalDetails.headline && (
                  <div className="break-all text-white text-10 mb-2 w-[80%]">
                    {userData.personalDetails.headline}
                  </div>
                )}
                {userData.personalDetails.photo.img && (
                  <div className="rounded-full overflow-hidden border-4 border-[#c8c8c8] w-max">
                    <img
                      alt="user_image"
                      src={userData.personalDetails.photo.img.url}
                      className="w-96 h-96"
                    />
                  </div>
                )}
              </div>
              <div
                className={`px-12 w-full text-left ${
                  userData.personalDetails.photo.img ? 'mt-32' : 'mt-96'
                }`}
              >
                <div className="mt-16">
                  {(userData.personalDetails.firstName || userData.personalDetails.lastName) && (
                    <>
                      <div className="text-[#3a5a87] font-600 text-14">Personal details</div>
                      <div className="border border-[#d7d7d7]" />
                      <div className="mt-10 flex items-center overflow-hidden">
                        <img
                          alt="User_Icon"
                          src="assets/images/resume_themes/icons/User_Icon.png"
                          className="w-14 h-14"
                        />
                        <div className="ml-6 text-10 break-all">
                          {userData.personalDetails.firstName} {userData.personalDetails.lastName}
                        </div>
                      </div>
                    </>
                  )}

                  {userData.personalDetails.email && (
                    <div className="mt-10 flex items-center overflow-hidden">
                      <img
                        alt="Mail_Icon"
                        src="assets/images/resume_themes/icons/Mail_Icon.png"
                        className="w-14 h-14"
                      />
                      <div className="ml-6 text-10 break-all">{userData.personalDetails.email}</div>
                    </div>
                  )}

                  {userData.personalDetails.phone && (
                    <div className="mt-10 flex items-center overflow-hidden">
                      <img
                        alt="Call_Icon"
                        src="assets/images/resume_themes/icons/Call_Icon.png"
                        className="w-14 h-14"
                      />
                      <div className="ml-6 text-10 break-all">{userData.personalDetails.phone}</div>
                    </div>
                  )}

                  {(userData.personalDetails.address ||
                    userData.personalDetails.postCode ||
                    userData.personalDetails.city) && (
                    <div className="mt-10 flex items-center overflow-hidden">
                      <img
                        alt="Home_Icon"
                        src="assets/images/resume_themes/icons/Home_Icon.png"
                        className="w-14 h-14"
                      />
                      <div className="ml-6 text-10 break-all">
                        {userData.personalDetails.address}{' '}
                        {`, ${userData.personalDetails.postCode}`}{' '}
                        {` ${userData.personalDetails.city}`}.
                      </div>
                    </div>
                  )}

                  {userData.personalDetails.dob && (
                    <div className="mt-10 flex items-center overflow-hidden">
                      <img
                        alt="Calendar_Icon"
                        src="assets/images/resume_themes/icons/calendarblue.png"
                        className="w-14 h-14"
                      />
                      <div className="tempcss ml-6 text-10 break-all overflow-hidden text-ellipsis">
                        {moment(userData.personalDetails.dob).format('MMMM Do YYYY')}
                      </div>
                    </div>
                  )}

                  {userData.personalDetails.placeBirth && (
                    <div className="mt-10 flex items-center overflow-hidden">
                      <img
                        alt="Location_Icon"
                        src="assets/images/resume_themes/icons/locationblue.png"
                        className="w-14 h-14"
                      />
                      <div className="ml-6 text-10 break-all">
                        {userData.personalDetails.placeBirth}.
                      </div>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {userData.languages.length !== 0 && (
                  <>
                    <div className="text-[#3a5a87] font-600 text-14 mt-16">Languages</div>
                    <div className="border border-[#d7d7d7]" />
                    {userData.languages.map((item, index) => (
                      <div key={index} className="grid gap-4 grid-cols-2 mt-10 overflow-hidden">
                        <div className="text-10 break-all">{item.name}</div>
                        <div className="flex items-center gap-5">
                          {item.level !== 0 && (
                            <div className="w-full bg-white h-3 mb-4 mt-5">
                              <div
                                className="bg-[#3a5a87] h-3 dark:bg-[#3a5a87]"
                                style={{ width: `${item.level}%` }}
                              />
                            </div>
                          )}
                          {/* {levelArr(item.level).map((i, n) => {
                            return (
                              <div
                                key={n}
                                className={`h-9 w-9 rounded-full ${i === 0 ? 'bg-gray-400' : 'bg-[#3a5a87]'
                                  }`}
                              />
                            );
                          })} */}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Skills */}
                {userData.skills.length !== 0 && (
                  <>
                    <div className="text-[#3a5a87] font-600 text-14 mt-16">Skills</div>
                    <div className="border border-[#d7d7d7]" />
                    {userData.skills.map((item, index) => (
                      <div key={index} className="grid gap-4 grid-cols-2 mt-10 overflow-hidden">
                        <div className="text-10 break-all">{item.name}</div>
                        <div className="flex items-center gap-5">
                          {item.level !== 0 && (
                            <div className="w-full bg-white h-3 mb-4 mt-5">
                              <div
                                className="bg-[#3a5a87] h-3 dark:bg-[#3a5a87]"
                                style={{ width: `${item.level}%` }}
                              />
                            </div>
                          )}
                          {/* {levelArr(item.level).map((i, n) => {
                            return (
                              <div
                                key={n}
                                className={`h-9 w-9 rounded-full ${i === 0 ? 'bg-gray-400' : 'bg-[#3a5a87]'
                                  }`}
                              />
                            );
                          })} */}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Hobbies */}
                {userData.hobbies.length !== 0 && (
                  <>
                    <div className="text-[#3a5a87] font-600 text-14 mt-16 overflow-hidden">
                      Hobbies
                    </div>
                    <div className="border border-[#d7d7d7]" />
                    <ul className="flex flex-col list-inside items-start mt-14 list-[square]">
                      {userData.hobbies.map((item, index) => (
                        <li key={index} className="text-10 break-all">
                          {item.hobby}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <div>
            <div className="bg-[#e6e6e6] w-full h-28 -mb-14 z-10 relative rounded-[110%]" />
            <div className="bg-[#3a5a87] w-full h-36 z-0" />
          </div> */}
        </div>

        {/* Profile */}
        <div className=" w-2/3 h-full flex">
          <div className="w-full h-full px-12 text-left pt-16">
            {userData.profiles?.description && (
              <>
                <div className="text-[#3a5a87] font-600 text-14">Profile</div>
                <div className="border border-[#d7d7d7] overflow-hidden" />
                <div className=" break-all text-10 my-10">{userData.profiles?.description}</div>
              </>
            )}
            {/* employments */}
            {userData.employments.length !== 0 && (
              <>
                {userData.employments.map((item, index) => (
                  <div key={index}>
                    <div key={item} className="text-[#3a5a87] font-600 text-14 mt-16">
                      Employments
                    </div>
                    <div className="border border-[#d7d7d7]" />
                    <div className="flex justify-between mt-5 overflow-hidden">
                      <div className="tempcss w-1/2 break-all text-10 font-bold mt-10 overflow-hidden text-ellipsis">
                        {item.position}
                      </div>
                      <div className="text-10 w-1/2 mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis ml-10">
                        {item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}
                      </div>
                    </div>
                    <div className="text-10 font-medium text-gray-500 mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.employer},{item.city}
                    </div>
                    <div className="flex text-justify">
                      <div className=" text-start text-10 text-justify">{item.description}</div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Education */}
            {userData.educations.length !== 0 && (
              <>
                <div className="text-[#3a5a87] font-600 text-14 mt-16">Education</div>
                <div className="border border-[#d7d7d7]" />
                {userData.educations.map((item, index) => (
                  <div key={index}>
                    <div key={item} className="flex justify-between mt-6 overflow-hidden">
                      <div className="tempcss w-1/2 text-10 break-all font-bold mt-10 overflow-hidden text-ellipsis">
                        {item.education}
                      </div>
                      <div className="text-10 w-1/2 mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis ml-10">
                        {item.startMonth} {item.startYear} {item.endMonth} {item.endYear}
                      </div>
                    </div>
                    <div className="flex text-10 font-medium text-gray-500 pt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.school} {item.city}
                    </div>
                    <div className="text-start text-10">{item.description}</div>
                  </div>
                ))}
              </>
            )}

            {/* Certificate */}
            {userData.certificates.length !== 0 && (
              <>
                <div className="text-[#3a5a87] font-600 text-14 mt-16">Certificate</div>
                <div className="border border-[#d7d7d7]" />
                {userData.certificates.map((item, index) => (
                  <div key={index}>
                    <div key={item} className="flex justify-between mt-6 overflow-hidden">
                      <div className="tempcss text-10 w-2/3 font-bold mt-10 break-all overflow-hidden text-ellipsis">
                        {item.certificate}
                      </div>
                      <div className="text-10 w-1/3 mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis ml-36">
                        {item.month} {item.year}
                      </div>
                    </div>
                    <div className="text-start text-10">{item.description}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template3;
