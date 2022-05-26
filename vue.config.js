module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "FFu",
        appId: "github.my-mc.ffu",
        copyright: "Copyright © 2022 My",
        win: {
          target: "nsis",
          icon: "icon.png",
        },
        mac: {
          target: "dmg",
          icon: "icon.png",
        },
        linux: {
          target: "deb",
          icon: "icon.png",
          category: "Utility",
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          artifactName: "${productName}_setup_${version}.${ext}",
          include: "installer.nsh",
        },
        directories: {
          buildResources: "resources",
        },
        extraFiles: [
          {
            from: "resources/bin/",
            to: "./",
            filter: ["**/*"],
          },
          {
            from: "./",
            to: "./",
            filter: [".env"],
          },
        ],
      },
    },
  },
};
