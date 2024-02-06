/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

function Template2() {
  const userData = useSelector((state) => state.resumeApp.resume);

  return (
    <>
      <div className="h-full">
        {/* HEADER */}
        <div
          className="w-full pt-28"
          style={{
            background: 'linear-gradient(to right, #333 33%, #fff 33%, #fff 50%)',
          }}
        >
          {/* Personal Details */}
          <div className="flex ml-[30px] bg-[#99c7c7] border-8 border-white min-h-64">
            <div className="w-1/3 flex justify-center items-center pl-26 ">
              {userData.personalDetails.photo.img && (
                <img
                  src={userData.personalDetails.photo.img.url}
                  className="w-96 h-96 rounded-full border-3 border-white"
                  alt="profile"
                />
              )}
            </div>
            <div className="self-center text-start ml-20 w-full  pt-5 pb-8">
              {(userData.personalDetails.firstName || userData.personalDetails.lastName) && (
                <div className="flex">
                  <h2 className="font-bold text-white text-[20px] break-all">
                    {userData.personalDetails.firstName} {userData.personalDetails.lastName}
                  </h2>
                </div>
              )}
              <div className="flex mt-4 ml-5">
                <div className="text-10 text-white break-all">
                  {userData.personalDetails.headline}
                </div>
              </div>

              {userData.personalDetails.email && (
                <div className="flex mt-4 ml-5 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/mails.png"
                    className="flex w-12 h-12"
                    alt="email"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.email}
                  </div>
                </div>
              )}
              {userData.personalDetails.phone && (
                <div className="flex mt-2 ml-5  overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/phone.png"
                    className="flex w-12 h-12"
                    alt="phone"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.phone}
                  </div>
                </div>
              )}
              {(userData.personalDetails.address ||
                userData.personalDetails.postCode ||
                userData.personalDetails.city) && (
                <div className="flex mt-2 ml-5 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/home.png"
                    className="flex w-12 h-12"
                    alt="home"
                  />
                  <div className="text-10 text-white ml-5 break-all ">
                    {userData.personalDetails.address} {`, ${userData.personalDetails.postCode}`}{' '}
                    {` ${userData.personalDetails.city}`}.
                  </div>
                </div>
              )}

              {userData.personalDetails.dob && (
                <div className="flex mt-2 ml-5 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/calendar.png"
                    className="flex w-12 h-12"
                    alt="calendar_icon"
                  />
                  <div className="text-10 text-white ml-5">
                    {moment(userData.personalDetails.dob).format('MMMM Do YYYY')}
                  </div>
                </div>
              )}

              {userData.personalDetails.placeBirth && (
                <div className="flex mt-2 ml-5 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/whiteGps.png"
                    className="flex w-12 h-12"
                    alt="whiteGps"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.placeBirth}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full w-full">
            <div className="w-1/3 pl-32 pr-8 bg-[#333]">
              {/* Languages */}

              {userData.languages.length !== 0 && (
                <>
                  <div className="text-base text-[#99c7c7] flex pt-12 mb-2 overflow-hidden">
                    LANGUAGES
                  </div>
                  {userData.languages.map((item, index) => (
                    <div key={index} className="text-left">
                      <div className="text-[#ccc] text-xs mt-16 break-all">{item.name}</div>
                      {item.level !== 0 && (
                        <div className="w-full bg-white h-3 mb-4 mt-5">
                          <div
                            className="bg-[#99c7c7] h-3 dark:bg-[#99c7c7]"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Skills */}

              {userData.skills.length !== 0 && (
                <>
                  <div className="text-base text-[#99c7c7] flex pt-12 mb-2 overflow-hidden">
                    SKILLS
                  </div>
                  {userData.skills.map((item, index) => (
                    <div key={index} className="text-left">
                      <div className="text-[#ccc] text-xs mt-16 break-all">{item.name}</div>
                      {item.level !== 0 && (
                        <div className="w-full bg-white h-3 mb-4 mt-5">
                          <div
                            className="bg-[#99c7c7] h-3 dark:bg-[#99c7c7]"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* HOBBIES */}
              {userData.hobbies.length !== 0 && (
                <>
                  <div className="text-base text-[#99c7c7] flex pt-12">HOBBIES</div>
                  <div>
                    <ul className="flex flex-col list-inside items-start mt-14 list-[square] text-[#ccc]">
                      {userData.hobbies.map((item, index) => (
                        <li key={index} className="text-xs text-left break-all">
                          {item.hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="w-2/3 ">
              <div className="mx-12 mt-5">
                {userData.profiles?.description && (
                  <>
                    <div className="p-2 text-base text-left text-white bg-[#99c7c7] overflow-hidden">
                      PROFILE
                    </div>
                    <div className="break-all text-xs font-light text-justify mt-12">
                      {userData.profiles?.description}
                    </div>
                  </>
                )}

                {/* employments */}
                {userData.employments.length !== 0 && (
                  <>
                    <div className="p-2 text-base text-left text-white bg-[#99c7c7] mt-16 overflow-hidden">
                      Employments
                    </div>
                    {userData.employments.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mt-6">
                          <div className="text-xs font-bold mt-10 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.position}
                          </div>
                          <div className="text-10 mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}
                          </div>
                        </div>
                        <div className="text-xs text-start font-medium text-gray-500 pt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.employer},{item.city}
                        </div>

                        <div className="flex ml-8 text-justify">
                          <div className="text-start text-xs text-justify break-all ">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* EDUCATION */}
                {userData.educations.length !== 0 && (
                  <>
                    <div className="p-2 text-base text-left text-white bg-[#99c7c7] mt-16">
                      EDUCATION
                    </div>
                    {userData.educations.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mt-6">
                          <div className="text-xs font-bold mt-10 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.education}
                          </div>
                          <div className="text-xs mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.startMonth} {item.startYear} {item.endMonth} {item.endYear}
                          </div>
                        </div>
                        <div className=" text-xs text-start font-medium text-gray-500 pt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.school} {item.city}
                        </div>
                        <div className="text-start break-all text-xs">{item.description}</div>
                      </div>
                    ))}
                  </>
                )}

                {/* CERTIFICATES */}
                {userData.certificates.length !== 0 && (
                  <>
                    <div className="p-2 text-base text-left text-white bg-[#99c7c7] mt-16 overflow-hidden">
                      CERTIFICATES
                    </div>
                    {userData.certificates.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mt-6">
                          <div className="text-xs font-bold mt-10 whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.certificate}
                          </div>
                          <div className="text-xs mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.month} {item.year}
                          </div>
                        </div>
                        <div className="text-start break-all text-xs">{item.description}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Template2;
