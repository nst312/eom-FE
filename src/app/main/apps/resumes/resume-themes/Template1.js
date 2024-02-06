/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import moment from 'moment';

function Template1() {
  const userData = useSelector((state) => state.resumeApp.resume);

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="h-full w-full">
        <div className="bg-[#303847] w-full py-24 flex">
          {userData.personalDetails.photo.img && (
            <img
              alt="description_of_image"
              src={userData.personalDetails.photo.img.url}
              className="h-[110px] w-[110px]"
            />
          )}
          <div className="self-center text-start ml-20 overflow-hidden w-full">
            {(userData.personalDetails.firstName || userData.personalDetails.lastName) && (
              <div className="text-white text-20 font-semibold break-all">
                {userData.personalDetails.firstName} {userData.personalDetails.lastName}
              </div>
            )}
            {userData.personalDetails.headline && (
              <div className="text-white text-10 mb-5 break-all">
                {userData.personalDetails.headline}
              </div>
            )}
            <div className="flex">
              {userData.personalDetails.email && (
                <div className="flex w-1/4 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/mails.png"
                    className="flex w-12 h-12"
                    alt="mails_img"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.email}
                  </div>
                </div>
              )}

              {userData.personalDetails.phone && (
                <div className="flex w-1/5 ml-10 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/phone.png"
                    className="flex w-12 h-12"
                    alt="phone_img"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.phone}
                  </div>
                </div>
              )}

              {(userData.personalDetails.address ||
                userData.personalDetails.postCode ||
                userData.personalDetails.city) && (
                <div className="flex w-1/2 overflow-hidden items-center">
                  <img
                    src="assets/images/resume_themes/icons/placeholder.png"
                    className="flex w-12 h-12"
                    alt="placeholder_img"
                  />
                  <div className="text-10 text-white ml-5 break-all">
                    {userData.personalDetails.address} {`, ${userData.personalDetails.postCode}`}{' '}
                    {` ${userData.personalDetails.city}`}.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1 part */}
        <div className="flex w-full">
          <div className="border-r-2 w-2/3 px-16">
            {/* Profile */}
            {userData.profiles?.description && (
              <>
                <div className="text-base flex pt-12">Profile</div>
                <div className="text-xs font-light text-justify mt-12 break-all">
                  {userData.profiles?.description}
                </div>
                <div className="border-b-1 mt-14" />
              </>
            )}

            {/* employments */}
            {userData.employments.length !== 0 && (
              <>
                <div className="text-base flex pt-12">Employments</div>
                {userData.employments.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mt-12 overflow-hidden">
                      <div className="text-xs font-bold mt-10 overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.position}
                      </div>
                      <div className="text-xs mt-10 font-sans overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}
                      </div>
                    </div>
                    <div className="text-xs text-start font-medium text-gray-500 pt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.employer},{item.city}
                    </div>
                    <div className="text-xs text-justify overflow-hidden">{item.description}</div>
                  </div>
                ))}

                <div className="border-b-1 mt-14" />
              </>
            )}

            {/* Education */}
            {userData.educations.length !== 0 && (
              <>
                <div className="text-base flex pt-12">Education</div>
                {userData.educations.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mt-6 overflow-hidden">
                      <div className="text-xs font-bold mt-10 overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.education}
                      </div>
                      <div className="text-xs mt-10 font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.startMonth} {item.startYear} {item.endMonth} {item.endYear}
                      </div>
                    </div>
                    <div className="text-xs text-start font-medium text-gray-500 pt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.school} {item.city}
                    </div>
                    <div className="text-start text-xs break-all">{item.description}</div>
                  </div>
                ))}

                <div className="border-b-1 mt-14" />
              </>
            )}

            {/* certificate */}
            {userData.certificates.length !== 0 && (
              <>
                <div className="text-base flex pt-12">Certificates</div>
                {userData.certificates.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mt-6 overflow-hidden">
                      <div className="text-xs font-bold mt-10 overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.certificate}
                      </div>
                      <div className="text-xs mt-10 font-sans overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.month} {item.year}
                      </div>
                    </div>
                    <div className="text-start text-xs break-all">{item.description}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* 2 part */}
          <div className="w-1/3 px-10 text-left">
            {(userData.personalDetails.placeBirth || userData.personalDetails.dob) && (
              <>
                <div className="text-base pt-12">Personal Details</div>
                {userData.personalDetails.dob && (
                  <>
                    <div className="text-xs font-medium text-gray-500 pt-12">Date of birth</div>
                    <div className="text-xs">
                      {moment(userData.personalDetails.dob).format('MMMM Do YYYY')}
                    </div>
                  </>
                )}
                {userData.personalDetails.placeBirth && (
                  <div className="overflow-hidden w-full">
                    <div className="text-xs font-medium text-gray-500 pt-12">Place of birth</div>
                    <div className="text-xs break-all">{userData.personalDetails.placeBirth}</div>
                  </div>
                )}
                <div className="border-b-1 mt-14" />
              </>
            )}

            {/* /!*Languages*!/ */}
            {userData.languages.length !== 0 && (
              <>
                <div className="text-base  pt-12">Languages</div>
                {userData.languages.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs mt-[18px] break-all">{item.name}</div>
                    <div className="mt-5">
                      {item.level !== 0 && (
                        <div className="w-full bg-gray-200 h-3 mb-4">
                          <div
                            className="bg-blue-gray-900 h-3 dark:bg-blue-gray-900"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-b-1 mt-24" />
              </>
            )}

            {/* /!*Skill*!/ */}
            {userData.skills.length !== 0 && (
              <>
                <div className="text-base  pt-12">Skills</div>
                {userData.skills.map((item, index) => (
                  <div key={index}>
                    <div className="text-xs mt-[18px] break-all">{item.name}</div>
                    <div className="mt-5">
                      {item.level !== 0 && (
                        <div className="w-full bg-gray-200 h-3 mb-4">
                          <div
                            className="bg-blue-gray-900 h-3 dark:bg-blue-gray-900"
                            style={{ width: `${item.level}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="border-b-1 mt-24" />
              </>
            )}
            {/* /!*Hobbies*!/ */}
            {userData.hobbies.length !== 0 && (
              <>
                <div className="text-base  pt-12">Hobbies</div>
                <div>
                  <ul className="list-inside items-start mt-14 list-[square] overflow-hidden">
                    {userData.hobbies.map((item, index) => (
                      <div key={index}>
                        <li className="text-xs break-all">{item.hobby}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template1;
