import { publicProcedure, router } from "../trpc";

export const authController = router({
  login: publicProcedure
    // .input(loginSchema)
    .mutation(async () => {
      // check if input is email or phone-number
        // let inputType = z.string().email().safeParse(input.emailOrPhone).success 
        //   ? 'email' as const
        //   : z.coerce.number().safeParse(input.emailOrPhone).success && 'mobile_number' as const;
        

        // if(!inputType) throw new TRPCError({
        //   code: "BAD_REQUEST",
        //   message: 'Please enter valid email or Mobile Number.'
        // });

      // get user from database
        // const userObj = await db.query.user_table.findFirst({
        //   columns: {
        //     created_at: false,
        //     status: false,
        //     updated_at: false,
        //   },
        //   where: and(
        //     eq(user_table[inputType], input.emailOrPhone),
        //     eq(user_table.status, 'Active')
        //   )
        // });

      // check password for user
        // const isMatch = userObj && await isPasswordMatch(input.password, userObj.password)

        // const ua = ctx.req.headers["user-agent"];
        // const { parserResults, uaTokenItems } = uaParser(ua);
        // const ip_address = getIpAddress(ctx.req);

        // const loginLogEntryObj = {
        //   ...uaTokenItems,
        //   browser_version: parserResults.browser.version,
        //   ip_address,
        //   mobile_number: userObj?.mobile_number || (inputType === 'mobile_number' ? Number(input.emailOrPhone) : null),
        //   os_version: parserResults.os.version,
        //   ua: ua,
        //   user_email: userObj?.email || (inputType === 'email' ? input.emailOrPhone : null),
        //   user_id: userObj?.id,
        // };

        // if(!userObj || !isMatch) {
        //   insertLoginLog({
        //     ...loginLogEntryObj,
        //     status: !userObj ? 'No User' : 'Password Mismatch',
        //   });
        //   throw new TRPCError({
        //     code: 'BAD_REQUEST',
        //     message: 'Invalid credentials.'
        //   })
        // };

      // get ownergroupid & include user-obj
        // const licenseObj = await getUserLicense(inputType, input.emailOrPhone, envVars.SUBSMANAGER_PROJECT_ID);

        // const { login_id } = await insertLoginLog({
        //   ...loginLogEntryObj,
        //   og_id: licenseObj?.og_id,
        //   status: 'success'
        // });
        
        
      // return user with auth-token
        // return {
        //   ...userObj,
        //   ...licenseObj,
        //   token: getAccessToken({
        //       login_id,
        //       user_id: userObj.id,
        //       ua: uaTokenItems,
        //       ...licenseObj
        //     })
        // };
        return {
          email: '',
          id: 1,
          mobile_number: null,
          name: '',
          og_handle: '',
          og_id: '',
          role: '',
          short_name: '',
          subscription_end_date: '',
          subscription_status: '',
          token: {
            access_token: '',
            access_token_expires: ''
          },
        }
    }),
  logout: publicProcedure
    .query(() => console.log('Logout successful.')
    ),
  signup: publicProcedure
    // .input(userInsertSchema)
    .mutation(async () => {
      return {
        email: '',
        id: 1,
        mobile_number: null,
        name: '',
      }
    }),
})